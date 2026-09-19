import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createHomeworkController,
  deleteHomeworkController,
  listHomeworkController,
  updateHomeworkController,
} from "../controllers/homeworkController.js";

export const homeworkRouter = Router();

homeworkRouter.use(authMiddleware);
homeworkRouter.get("/", listHomeworkController);
homeworkRouter.post("/", createHomeworkController);
homeworkRouter.put("/:id", updateHomeworkController);
homeworkRouter.delete("/:id", deleteHomeworkController);
