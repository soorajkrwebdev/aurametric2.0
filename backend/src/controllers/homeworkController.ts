import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import { createHomework, deleteHomework, listHomework, updateHomework } from "../services/homeworkService.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";

export async function listHomeworkController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const homework = await listHomework(userId);
    return sendSuccess(res, homework);
  } catch (error) {
    return next(error);
  }
}

export async function createHomeworkController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    if (!payload.title || String(payload.title).trim().length === 0) {
      throw Object.assign(new Error("Homework title is required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    const priority = payload.priority ? String(payload.priority) : "medium";
    const status = payload.status ? String(payload.status) : "not-started";

    const homework = await createHomework(userId, {
      subject_id: payload.subject_id ? String(payload.subject_id) : null,
      title: String(payload.title),
      description: payload.description ? String(payload.description) : null,
      due_date: payload.due_date ? String(payload.due_date) : null,
      priority: priority === "low" || priority === "medium" || priority === "high" ? priority : "medium",
      status:
        status === "not-started" || status === "in-progress" || status === "submitted" || status === "late"
          ? status
          : "not-started",
    });

    return sendSuccess(res, homework, 201);
  } catch (error) {
    return next(error);
  }
}

export async function updateHomeworkController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const payload = req.body ?? {};
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const priority = payload.priority ? String(payload.priority) : undefined;
    const status = payload.status ? String(payload.status) : undefined;

    const homework = await updateHomework(userId, recordId, {
      subject_id: payload.subject_id !== undefined ? (payload.subject_id ? String(payload.subject_id) : null) : undefined,
      title: payload.title ? String(payload.title) : undefined,
      description: payload.description !== undefined ? (payload.description ? String(payload.description) : null) : undefined,
      due_date: payload.due_date !== undefined ? (payload.due_date ? String(payload.due_date) : null) : undefined,
      priority:
        priority === "low" || priority === "medium" || priority === "high" ? priority : undefined,
      status:
        status === "not-started" || status === "in-progress" || status === "submitted" || status === "late"
          ? status
          : undefined,
    });

    return sendSuccess(res, homework);
  } catch (error) {
    return next(error);
  }
}

export async function deleteHomeworkController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    await deleteHomework(userId, recordId);
    return sendSuccess(res, { id: recordId, deleted: true });
  } catch (error) {
    return next(error);
  }
}
