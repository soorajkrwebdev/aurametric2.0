import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getDashboard } from "../controllers/dashboardController.js";

export const dashboardRouter = Router();

dashboardRouter.use(authMiddleware);
dashboardRouter.get("/", getDashboard);
