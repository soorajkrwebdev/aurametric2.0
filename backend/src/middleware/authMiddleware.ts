import type { NextFunction, Request, Response } from "express";
import { supabase } from "../config/supabase.js";

export type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    email?: string | null;
  };
  userId?: string;
};

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: {
        message: "Missing or invalid Authorization header.",
        code: "UNAUTHORIZED",
      },
    });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: "Supabase access token is required.",
        code: "UNAUTHORIZED",
      },
    });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({
      success: false,
      error: {
        message: "Invalid or expired Supabase token.",
        code: "UNAUTHORIZED",
      },
    });
  }

  req.user = {
    id: data.user.id,
    email: data.user.email,
  };
  req.userId = data.user.id;

  return next();
}
