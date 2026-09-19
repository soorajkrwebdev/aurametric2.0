import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { listNotifications, markNotificationRead } from "../services/notificationService.js";

export async function listNotificationsController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const notifications = await listNotifications(userId);
    return sendSuccess(res, notifications);
  } catch (error) {
    return next(error);
  }
}

export async function markNotificationReadController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const notification = await markNotificationRead(userId, recordId);
    return sendSuccess(res, notification);
  } catch (error) {
    return next(error);
  }
}
