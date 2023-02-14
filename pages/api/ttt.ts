// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ProdTTTApiHandler from "../../lib/api/ttt/ProdTTTAPIHandler";

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
  const handler = new ProdTTTApiHandler();
  const { status, response } = await handler.handleApiRequest(req, res);
  res.status(status).json(response);
}
