import { apiClient } from "./apiClient";
import type { Task } from "@/types";

export const taskService = {
  list: () => apiClient.get<Task[]>("/tasks"),
  create: (payload: Partial<Task>) => apiClient.post<Task>("/tasks", payload),
  update: (id: string, payload: Partial<Task>) => apiClient.put<Task>(`/tasks/${id}`, payload),
  remove: (id: string) => apiClient.remove<{ id: string; deleted: boolean }>(`/tasks/${id}`),
};
