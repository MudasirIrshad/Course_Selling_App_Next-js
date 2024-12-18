import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../database/db";
import { corsMiddleware } from "@/lib/cors";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    corsMiddleware(req,res)
    try {
      let courses = await Course.find({ published: true });
      res.status(200).send({ courses });
    } catch (error) {
      res.status(404).json({ message: "Error" });
    }
  }
}
