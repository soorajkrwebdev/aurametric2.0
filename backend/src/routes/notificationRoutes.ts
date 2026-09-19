import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  listNotificationsController,
  markNotificationReadController,
} from "../controllers/notificationController.js";

export const notificationRouter = Router();

notificationRouter.use(authMiddleware);
notificationRouter.get("/", listNotificationsController);
notificationRouter.put("/:id/read", markNotificationReadController);
