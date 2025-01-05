import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../database/db";
import { corsMiddleware } from "@/lib/cors";
import { CourseZodSchema, SECRET_KEY } from "@/lib/util";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const inputs = CourseZodSchema.safeParse(req.body);

    if (inputs.error) res.send({ message: inputs.error });
    if (!inputs.success) res.send("Input validation error");
    let title = inputs.data?.title;
    let description = inputs.data?.description;
    let price = inputs.data?.price;
    let imageLink = inputs.data?.imageLink;
    let published = inputs.data?.published;
    let findCourse = await Course.findOne({ title, description, price });

    if (findCourse) res.send("course already exits");
    else {
      let newCourse = new Course({
        title,
        description,
        price,
        imageLink,
        published,
      });
      await newCourse.save();
      res.send("Course added succefully");
    }
  } catch (error) {
    res.send(404);
  }
}
