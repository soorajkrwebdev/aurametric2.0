import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { createExam, deleteExam, listExams, updateExam } from "../services/examService.js";

export async function listExamsController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const exams = await listExams(userId);
    return sendSuccess(res, exams);
  } catch (error) {
    return next(error);
  }
}

export async function createExamController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    if (!payload.exam_date || !payload.exam_type) {
      throw Object.assign(new Error("Exam date and type are required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    const examType = payload.exam_type ? String(payload.exam_type) : "internal";

    const exam = await createExam(userId, {
      subject_id: payload.subject_id ? String(payload.subject_id) : null,
      exam_date: String(payload.exam_date),
      exam_type:
        examType === "internal" || examType === "lab" || examType === "end-semester"
          ? examType
          : "internal",
      notes: payload.notes ? String(payload.notes) : null,
    });

    return sendSuccess(res, exam, 201);
  } catch (error) {
    return next(error);
  }
}

export async function updateExamController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const payload = req.body ?? {};
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const examType = payload.exam_type ? String(payload.exam_type) : undefined;

    const exam = await updateExam(userId, recordId, {
      subject_id: payload.subject_id !== undefined ? (payload.subject_id ? String(payload.subject_id) : null) : undefined,
      exam_date: payload.exam_date ? String(payload.exam_date) : undefined,
      exam_type:
        examType === "internal" || examType === "lab" || examType === "end-semester"
          ? examType
          : undefined,
      notes: payload.notes !== undefined ? (payload.notes ? String(payload.notes) : null) : undefined,
    });

    return sendSuccess(res, exam);
  } catch (error) {
    return next(error);
  }
}

export async function deleteExamController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    await deleteExam(userId, recordId);
    return sendSuccess(res, { id: recordId, deleted: true });
  } catch (error) {
    return next(error);
  }
}
