import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../services/dashboardService.js";

export async function getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const dashboardData = await getDashboardData(userId);
    return sendSuccess(res, dashboardData);
  } catch (error) {
    return next(error);
  }
}
