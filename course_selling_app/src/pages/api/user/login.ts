import { NextApiRequest, NextApiResponse } from "next";
import { corsMiddleware } from "@/lib/cors";
import { User } from "../database/db";
import { UserZodSchema } from "@/lib/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    corsMiddleware(req, res);
    try {
      const inputs = UserZodSchema.safeParse(req.body);
      if (inputs.error) res.send({ message: inputs.error });

      if (!inputs.success) res.send("issue in input data");
      let username = inputs.data?.username;
      let gmail = inputs.data?.gmail;
      let password = inputs.data?.password;
      let findUser = await User.findOne({ username, gmail, password });
      if (findUser) res.send({ message: false });
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
