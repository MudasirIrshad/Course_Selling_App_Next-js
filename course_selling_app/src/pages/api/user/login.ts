import { NextApiRequest, NextApiResponse } from "next";
import { corsMiddleware } from "@/lib/cors";
import { User } from "../database/db";
import { SECRET_KEY, UserZodSchema } from "@/lib/util";
import jwt from 'jsonwebtoken'
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
      let find = await User.findOne({ gmail, username, password });
      if (find) {
        let token = jwt.sign({ username, gmail }, SECRET_KEY);
        res.send({ message: "user", token });
      } else res.send("Please Signin first. thankyou");
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
