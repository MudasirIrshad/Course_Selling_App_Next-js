import { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "../database/db";
import { corsMiddleware } from "@/lib/cors";
import { AdminZodSchema, SECRET_KEY } from "@/lib/util";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    corsMiddleware(req, res);

    const inputs = AdminZodSchema.safeParse(req.body);
    if (inputs.error) res.send({ message: inputs.error });

    if (!inputs.success) res.send("issue in input data");
    let adminname = inputs.data?.adminname;
    let gmail = inputs.data?.gmail;
    let password = inputs.data?.password;
    let findAdmin = await Admin.findOne({ gmail });
    if (findAdmin) res.send({ message: "Admin exits" });
    else {
      const newAdmin = new Admin({
        adminname,
        gmail,
        password,
      });
      await newAdmin.save();
      let token = jwt.sign({ adminname, gmail }, SECRET_KEY);
      res.send({ message: "Admin Signup Token", token });
    }
  }
}
