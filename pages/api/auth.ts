import { NextApiRequest, NextApiResponse } from "next";

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { jwt = "", userType = "", id = "" } = req.cookies;
  res.status(200).json({ jwt, userType, id });
}
