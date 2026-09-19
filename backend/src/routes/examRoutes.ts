import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createExamController,
  deleteExamController,
  listExamsController,
  updateExamController,
} from "../controllers/examController.js";

export const examRouter = Router();

examRouter.use(authMiddleware);
examRouter.get("/", listExamsController);
examRouter.post("/", createExamController);
examRouter.put("/:id", updateExamController);
examRouter.delete("/:id", deleteExamController);
