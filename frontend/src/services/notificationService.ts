import { apiClient } from "./apiClient";
import type { AppNotification } from "@/types";

export const notificationService = {
  list: () => apiClient.get<AppNotification[]>("/notifications"),
  markRead: (id: string) => apiClient.put<AppNotification>(`/notifications/${id}/read`, {}),
};
