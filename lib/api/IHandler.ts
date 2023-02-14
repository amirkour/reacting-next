import type { NextApiRequest, NextApiResponse } from "next";

export interface IApiHandlerResponse {
  status: number;
  response: any;
}

export interface IApiHandler {
  handleApiRequest(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<IApiHandlerResponse>;
}
