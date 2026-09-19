import { apiClient } from "./apiClient";
import type { ChatMessage } from "@/types";

export const chatService = {
  list: () =>
    apiClient.get<ChatMessage[]>("/chat").then((messages) =>
      messages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content ?? message.message ?? "",
        time: message.created_at
          ? new Date(message.created_at).toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "2-digit",
            })
          : message.time ?? "Now",
      })),
    ),
  send: (message: string) => apiClient.post<{ message: string }>("/chat", { message }),
};
