// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | string
  | {
      error?: string | null;
      board?: string[] | null;
      outcome: string | null;
      nextToMove: string | null;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let status, response;

  try {
    const apiKey = process.env.TIC_TAC_TOE_API_KEY;
    if (!apiKey) throw "missing api key - cannot query tic-tac-toe api w/o it";

    const apiUrl = process.env.TIC_TAC_TOE_API_URL;
    if (!apiUrl) throw "missing api url - cannot query tic-tac-toe api w/o it";

    if (!req.body) throw "missing required request body";

    console.log(`got this req body: ${req.body}`);

    response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: req.body,
    }).then(async (res) => {
      if (!res.ok) {
        status = res.status;
        const resBody = await res.json();
        throw resBody?.error ?? "An unexpected error occurred";
      }

      return res.json();
    });

    status = 200;
    console.log(`Returning this response: ${JSON.stringify(response)}`);
  } catch (e: any) {
    console.log(`/api/hello: Encountered the following error: ${e}`);
    status = status ?? 500;
    response = e;
  }

  // @ts-ignore
  res.status(status).json(response);
}
