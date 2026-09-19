import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { notFound } from "./middleware/notFound.js";
import { apiRouter } from "./routes/index.js";

export function createApp() {
  const app = express();
  const configuredOrigins = (env.clientOrigin ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowedOrigins = new Set([
    ...configuredOrigins,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
  ]);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error(`Origin ${origin} is not allowed by CORS`));
      },
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({
      success: true,
      data: {
        name: "Aurametric API",
        version: "1.0.0",
      },
    });
  });

  app.use("/api", apiRouter);
  app.use(notFound);
  app.use(errorMiddleware);

  return app;
}
