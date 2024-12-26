import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../database/db";
import { corsMiddleware } from "@/lib/cors";
import { UserZodSchema, SECRET_KEY } from "@/lib/util";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    corsMiddleware(req, res);

    const inputs = UserZodSchema.safeParse(req.body);
    if (inputs.error) res.send({ message: inputs.error });

    if (!inputs.success) res.send("issue in input data");
    let username = inputs.data?.username;
    let gmail = inputs.data?.gmail;
    let password = inputs.data?.password;
    let findAdmin = await User.findOne({ gmail });
    if (findAdmin) res.send({ message: false });
    else {
      const newUser = new User({
        username,
        gmail,
        password,
      });
      await newUser.save();
      let token = jwt.sign({ username, gmail }, SECRET_KEY);
      res.send({ message: true, token });
    }
  }
}
