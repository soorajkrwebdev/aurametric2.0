import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createHobbyController,
  deleteHobbyController,
  listHobbiesController,
  updateHobbyController,
} from "../controllers/hobbyController.js";

export const hobbyRouter = Router();

hobbyRouter.use(authMiddleware);
hobbyRouter.get("/", listHobbiesController);
hobbyRouter.post("/", createHobbyController);
hobbyRouter.put("/:id", updateHobbyController);
hobbyRouter.delete("/:id", deleteHobbyController);
