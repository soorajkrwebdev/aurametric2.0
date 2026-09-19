import { Router } from "express";
import { chatRouter } from "./chatRoutes.js";
import { dashboardRouter } from "./dashboardRoutes.js";
import { examRouter } from "./examRoutes.js";
import { healthRouter } from "./health.routes.js";
import { hobbyRouter } from "./hobbyRoutes.js";
import { homeworkRouter } from "./homeworkRoutes.js";
import { notificationRouter } from "./notificationRoutes.js";
import { profileRouter } from "./profileRoutes.js";
import { studyRouter } from "./studyRoutes.js";
import { subjectRouter } from "./subjectRoutes.js";
import { taskRouter } from "./taskRoutes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/subjects", subjectRouter);
apiRouter.use("/homework", homeworkRouter);
apiRouter.use("/study-sessions", studyRouter);
apiRouter.use("/exams", examRouter);
apiRouter.use("/tasks", taskRouter);
apiRouter.use("/hobbies", hobbyRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/chat", chatRouter);
