import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { createSubject, deleteSubject, listSubjects, updateSubject } from "../services/subjectService.js";

export async function listSubjectsController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const subjects = await listSubjects(userId);
    return sendSuccess(res, subjects);
  } catch (error) {
    return next(error);
  }
}

export async function createSubjectController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    if (!payload.name || String(payload.name).trim().length === 0) {
      throw Object.assign(new Error("Subject name is required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    const subject = await createSubject(userId, {
      name: String(payload.name),
      code: payload.code ? String(payload.code) : null,
      semester: payload.semester ? Number(payload.semester) : null,
    });

    return sendSuccess(res, subject, 201);
  } catch (error) {
    return next(error);
  }
}

export async function updateSubjectController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const payload = req.body ?? {};
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const subject = await updateSubject(userId, recordId, {
      name: payload.name ? String(payload.name) : undefined,
      code: payload.code !== undefined ? (payload.code ? String(payload.code) : null) : undefined,
      semester: payload.semester !== undefined ? Number(payload.semester) : undefined,
    });

    return sendSuccess(res, subject);
  } catch (error) {
    return next(error);
  }
}

export async function deleteSubjectController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    await deleteSubject(userId, recordId);
    return sendSuccess(res, { id: recordId, deleted: true });
  } catch (error) {
    return next(error);
  }
}
