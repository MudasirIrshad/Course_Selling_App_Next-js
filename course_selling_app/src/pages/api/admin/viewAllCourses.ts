import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../database/db";
import { corsMiddleware } from "@/lib/cors";
import { UserZodSchema, SECRET_KEY } from "@/lib/util";
// import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let find = await Course.find();
    if (!find) res.send("No course available");
    else {
      res.send({ courses: find });
    }
  } catch (error) {
    res.send(error);
  }
}
