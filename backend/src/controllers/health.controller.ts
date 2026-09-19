import type { Request, Response } from "express";
import { sendSuccess } from "../utils/http.js";

export function getHealth(_req: Request, res: Response) {
  sendSuccess(res, {
    status: "ok",
    service: "aurametric-api",
    timestamp: new Date().toISOString(),
  });
}
