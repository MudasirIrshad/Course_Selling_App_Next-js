import Cors from "cors";

// Initialize the CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"], // List allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  origin: "*", // Allow all origins (or you can specify your frontend URL)
});

// Helper function to enable CORS
export const runMiddleware = (req: any, res: any, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

// Middleware for CORS
export const corsMiddleware = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);
};
