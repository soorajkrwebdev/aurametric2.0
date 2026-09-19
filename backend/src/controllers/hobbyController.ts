import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { createHobby, deleteHobby, listHobbies, updateHobby } from "../services/hobbyService.js";

export async function listHobbiesController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const hobbies = await listHobbies(userId);
    return sendSuccess(res, hobbies);
  } catch (error) {
    return next(error);
  }
}

export async function createHobbyController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    if (!payload.hobby_name || String(payload.hobby_name).trim().length === 0) {
      throw Object.assign(new Error("Hobby name is required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    const hobby = await createHobby(userId, {
      hobby_name: String(payload.hobby_name),
      hours_spent: Number(payload.hours_spent ?? 0),
      date: String(payload.date),
      notes: payload.notes ? String(payload.notes) : null,
    });

    return sendSuccess(res, hobby, 201);
  } catch (error) {
    return next(error);
  }
}

export async function updateHobbyController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const payload = req.body ?? {};
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const hobby = await updateHobby(userId, recordId, {
      hobby_name: payload.hobby_name ? String(payload.hobby_name) : undefined,
      hours_spent: payload.hours_spent !== undefined ? Number(payload.hours_spent) : undefined,
      date: payload.date ? String(payload.date) : undefined,
      notes: payload.notes !== undefined ? (payload.notes ? String(payload.notes) : null) : undefined,
    });

    return sendSuccess(res, hobby);
  } catch (error) {
    return next(error);
  }
}

export async function deleteHobbyController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    await deleteHobby(userId, recordId);
    return sendSuccess(res, { id: recordId, deleted: true });
  } catch (error) {
    return next(error);
  }
}
