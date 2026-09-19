import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const message = err instanceof Error ? err.message : "Unexpected server error";
  logger.error(message, err);

  res.status(500).json({
    success: false,
    error: {
      message: "Something went wrong. Please try again later.",
      code: "INTERNAL_ERROR",
    },
  });
}
