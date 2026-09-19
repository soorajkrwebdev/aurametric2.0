import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { listChatMessagesController, sendChatMessageController } from "../controllers/chatController.js";

export const chatRouter = Router();

chatRouter.use(authMiddleware);
chatRouter.get("/", listChatMessagesController);
chatRouter.post("/", sendChatMessageController);
