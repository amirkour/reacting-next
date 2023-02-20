import { NextApiRequest, NextApiResponse } from "next";
import { IApiHandler, IApiHandlerResponse } from "../IHandler";

export default class DevTTTApiHandler implements IApiHandler {
  async handleApiRequest(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<IApiHandlerResponse> {
    let status = 200,
      response;

    const apiUrl = process.env.TIC_TAC_TOE_API_URL;
    if (!apiUrl) throw "missing api url - cannot query tic-tac-toe api w/o it";
    if (!req.body) throw "missing required request body";

    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    } catch (e) {
      console.error(
        `${this.constructor.name}: Encountered the following error: ${e}`
      );
      status = status ?? 500;
      response = e;
    }

    return { status, response: JSON.parse(response.body) };
  }
}
