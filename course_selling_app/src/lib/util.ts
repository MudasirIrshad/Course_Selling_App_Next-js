import { z } from "zod";

export const AdminZodSchema = z
  .object({
    adminname: z.string().max(20),
    gmail: z.string().max(50),
    password: z.string().max(20),
  })
  .strict();

export const UserZodSchema = z
  .object({
    username: z.string().max(20),
    gmail: z.string().max(50),
    password: z.string().max(20),
  })
  .strict();
export type User = z.infer<typeof UserZodSchema>;

export const CourseZodSchema = z
  .object({
    title: z.string().max(30),
    description: z.string().max(100),
    price: z.number(),
    imageLink: z.string(),
    published: z.boolean(),
  })
  .strict();
export const SECRET_KEY = "my scret key";
