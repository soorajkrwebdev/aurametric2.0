import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { createStudySession, deleteStudySession, listStudySessions, updateStudySession } from "../services/studyService.js";

export async function listStudySessionsController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const sessions = await listStudySessions(userId);
    return sendSuccess(res, sessions);
  } catch (error) {
    return next(error);
  }
}

export async function createStudySessionController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    if (!payload.topic || String(payload.topic).trim().length === 0) {
      throw Object.assign(new Error("Study topic is required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    if (!payload.study_date || !payload.duration) {
      throw Object.assign(new Error("Study date and duration are required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    const session = await createStudySession(userId, {
      subject_id: payload.subject_id ? String(payload.subject_id) : null,
      topic: String(payload.topic),
      study_date: String(payload.study_date),
      duration: Number(payload.duration),
      notes: payload.notes ? String(payload.notes) : null,
    });

    return sendSuccess(res, session, 201);
  } catch (error) {
    return next(error);
  }
}

export async function updateStudySessionController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const payload = req.body ?? {};
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const session = await updateStudySession(userId, recordId, {
      subject_id: payload.subject_id !== undefined ? (payload.subject_id ? String(payload.subject_id) : null) : undefined,
      topic: payload.topic ? String(payload.topic) : undefined,
      study_date: payload.study_date ? String(payload.study_date) : undefined,
      duration: payload.duration !== undefined ? Number(payload.duration) : undefined,
      notes: payload.notes !== undefined ? (payload.notes ? String(payload.notes) : null) : undefined,
    });

    return sendSuccess(res, session);
  } catch (error) {
    return next(error);
  }
}

export async function deleteStudySessionController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    await deleteStudySession(userId, recordId);
    return sendSuccess(res, { id: recordId, deleted: true });
  } catch (error) {
    return next(error);
  }
}
