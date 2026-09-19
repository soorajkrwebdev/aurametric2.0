import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import { createTask, deleteTask, listTasks, updateTask } from "../services/taskService.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";

export async function listTasksController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const tasks = await listTasks(userId);
    return sendSuccess(res, tasks);
  } catch (error) {
    return next(error);
  }
}

export async function createTaskController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    if (!payload.task_title || String(payload.task_title).trim().length === 0) {
      throw Object.assign(new Error("Task title is required."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    const status = payload.status ? String(payload.status) : "open";
    const priority = payload.priority ? String(payload.priority) : "medium";

    const task = await createTask(userId, {
      task_title: String(payload.task_title),
      status: status === "open" || status === "done" ? status : "open",
      priority: priority === "low" || priority === "medium" || priority === "high" ? priority : "medium",
      due_date: payload.due_date ? String(payload.due_date) : null,
    });

    return sendSuccess(res, task, 201);
  } catch (error) {
    return next(error);
  }
}

export async function updateTaskController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const payload = req.body ?? {};
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const status = payload.status ? String(payload.status) : undefined;
    const priority = payload.priority ? String(payload.priority) : undefined;

    const task = await updateTask(userId, recordId, {
      task_title: payload.task_title ? String(payload.task_title) : undefined,
      status: status === "open" || status === "done" ? status : undefined,
      priority:
        priority === "low" || priority === "medium" || priority === "high" ? priority : undefined,
      due_date: payload.due_date !== undefined ? (payload.due_date ? String(payload.due_date) : null) : undefined,
    });

    return sendSuccess(res, task);
  } catch (error) {
    return next(error);
  }
}

export async function deleteTaskController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const recordId = String(id);

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    await deleteTask(userId, recordId);
    return sendSuccess(res, { id: recordId, deleted: true });
  } catch (error) {
    return next(error);
  }
}
