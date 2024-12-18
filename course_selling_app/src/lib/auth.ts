import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@/lib/util"; // Adjust based on your project structure

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject("Unauthorized");
      } else {
        resolve(decoded);
      }
    });
  });
};
