import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile, updateProfileController } from "../controllers/profileController.js";

export const profileRouter = Router();

profileRouter.use(authMiddleware);
profileRouter.get("/", getProfile);
profileRouter.put("/", updateProfileController);
