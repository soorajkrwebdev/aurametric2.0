import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createStudySessionController,
  deleteStudySessionController,
  listStudySessionsController,
  updateStudySessionController,
} from "../controllers/studyController.js";

export const studyRouter = Router();

studyRouter.use(authMiddleware);
studyRouter.get("/", listStudySessionsController);
studyRouter.post("/", createStudySessionController);
studyRouter.put("/:id", updateStudySessionController);
studyRouter.delete("/:id", deleteStudySessionController);
