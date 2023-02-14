import { NextApiRequest, NextApiResponse } from "next";
import { IApiHandler, IApiHandlerResponse } from "../IHandler";

export default class ProdTTTApiHandler implements IApiHandler {
  async handleApiRequest(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ): Promise<IApiHandlerResponse> {
    let status, response;

    try {
      const apiKey = process.env.TIC_TAC_TOE_API_KEY;
      if (!apiKey)
        throw "missing api key - cannot query tic-tac-toe api w/o it";

      const apiUrl = process.env.TIC_TAC_TOE_API_URL;
      if (!apiUrl)
        throw "missing api url - cannot query tic-tac-toe api w/o it";

      if (!req.body) throw "missing required request body";

      console.log(`got this req body: ${req.body}`);

      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: req.body,
      }).then(async (apiResponse) => {
        if (!apiResponse.ok) {
          status = apiResponse.status;
          const resBody = await apiResponse.json();
          throw resBody?.error ?? "An unexpected error occurred";
        }

        return apiResponse.json();
      });

      status = 200;
      console.log(`Returning this response: ${JSON.stringify(response)}`);
    } catch (e: any) {
      console.error(
        `${this.constructor.name}: Encountered the following error: ${e}`
      );
      status = status ?? 500;
      response = e;
    }

    return { status, response };
  }
}
