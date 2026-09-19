import { apiClient } from "./apiClient";
import type { Homework } from "@/types";

export const homeworkService = {
  list: () => apiClient.get<Homework[]>("/homework"),
  create: (payload: Partial<Homework>) => apiClient.post<Homework>("/homework", payload),
  update: (id: string, payload: Partial<Homework>) => apiClient.put<Homework>(`/homework/${id}`, payload),
  remove: (id: string) => apiClient.remove<{ id: string; deleted: boolean }>(`/homework/${id}`),
};
