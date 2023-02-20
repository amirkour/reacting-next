import type { NextApiRequest, NextApiResponse } from "next";
import { ProdTTTApiHandler, DevTTTApiHandler } from "../../lib/api/ttt";
import { isDev } from "../../lib/config";
import { IApiHandler } from "../../lib/api/IHandler";

type Data = {
  error?: string | null;
  board?: string[] | null;
  outcome: string | null;
  nextToMove: string | null;
};

const getHandler = (): IApiHandler => {
  if (isDev()) {
    console.log(`detected dev environment`);
    return new DevTTTApiHandler();
  } else {
    console.log(`detected PROD environment`);
    return new ProdTTTApiHandler();
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(`Received request for ttt game: ${req.body}`);
  const handler = getHandler();

  console.log(`handling request ...`);
  const { status, response } = await handler.handleApiRequest(req, res);

  console.log(
    `returning status ${status} and body ${JSON.stringify(response)}`
  );
  res.status(status).json(response);
}
