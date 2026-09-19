import { apiClient } from "./apiClient";
import type { Exam } from "@/types";

export const examService = {
  list: () => apiClient.get<Exam[]>("/exams"),
  create: (payload: Partial<Exam>) => apiClient.post<Exam>("/exams", payload),
  update: (id: string, payload: Partial<Exam>) => apiClient.put<Exam>(`/exams/${id}`, payload),
  remove: (id: string) => apiClient.remove<{ id: string; deleted: boolean }>(`/exams/${id}`),
};
