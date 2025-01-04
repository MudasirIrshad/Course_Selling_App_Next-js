import { NextApiRequest, NextApiResponse } from "next";
import { corsMiddleware } from "@/lib/cors";
import { Admin } from "../database/db";
import { AdminZodSchema, SECRET_KEY } from "@/lib/util";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const inputs = AdminZodSchema.safeParse(req.body);
    console.log(inputs);

    if (inputs.error) res.send({ message: inputs.error });
    if (!inputs.success) res.send("issue in input data");
    let adminname = inputs.data?.adminname;
    let gmail = inputs.data?.gmail;
    let password = inputs.data?.password;
    let findAdmin = await Admin.findOne({ gmail, adminname, password });
    if (findAdmin) {
      let token = jwt.sign({ adminname, gmail }, SECRET_KEY);
      res.send({ message: "admin", token });
    } else res.send("Please Signin first. thankyou");
  } catch (error) {
    res.status(404).json({ error });
  }
}
