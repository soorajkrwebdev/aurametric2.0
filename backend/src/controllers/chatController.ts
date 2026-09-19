import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { listChatMessages, sendChatMessage } from "../services/chatService.js";

export async function listChatMessagesController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const messages = await listChatMessages(userId);
    return sendSuccess(res, messages);
  } catch (error) {
    return next(error);
  }
}

export async function sendChatMessageController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};
    const message = String(payload.message ?? "").trim();

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    if (!message) {
      throw Object.assign(new Error("Message is required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    if (message.length > 2000) {
      throw Object.assign(new Error("Message must be 2000 characters or fewer."), {
        statusCode: 400,
        code: "VALIDATION_ERROR",
      });
    }

    const reply = await sendChatMessage(userId, message);

    return sendSuccess(res, { message: reply }, 201);
  } catch (error) {
    return next(error);
  }
}
