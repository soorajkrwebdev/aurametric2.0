import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { notFound } from "./middleware/notFound.js";
import { apiRouter } from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.clientOrigin,
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
