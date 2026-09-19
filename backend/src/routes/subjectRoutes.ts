import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createSubjectController,
  deleteSubjectController,
  listSubjectsController,
  updateSubjectController,
} from "../controllers/subjectController.js";

export const subjectRouter = Router();

subjectRouter.use(authMiddleware);
subjectRouter.get("/", listSubjectsController);
subjectRouter.post("/", createSubjectController);
subjectRouter.put("/:id", updateSubjectController);
subjectRouter.delete("/:id", deleteSubjectController);
