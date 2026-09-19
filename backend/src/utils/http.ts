import type { Response } from "express";
import type { ApiSuccess } from "../types/index.js";

export function sendSuccess<T>(res: Response, data: T, status = 200) {
  const body: ApiSuccess<T> = { success: true, data };
  return res.status(status).json(body);
}
