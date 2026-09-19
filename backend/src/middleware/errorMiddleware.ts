import type { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: Error & { statusCode?: number; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = error.statusCode ?? 500;
  const message = error.message ?? "Internal server error";

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: error.code ?? "INTERNAL_ERROR",
    },
  });
}
