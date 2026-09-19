import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTaskController,
  deleteTaskController,
  listTasksController,
  updateTaskController,
} from "../controllers/taskController.js";

export const taskRouter = Router();

taskRouter.use(authMiddleware);
taskRouter.get("/", listTasksController);
taskRouter.post("/", createTaskController);
taskRouter.put("/:id", updateTaskController);
taskRouter.delete("/:id", deleteTaskController);
