import { apiClient } from "./apiClient";
import type { Subject } from "@/types";

export const subjectService = {
  list: () => apiClient.get<Subject[]>("/subjects"),
  create: (payload: Partial<Subject>) => apiClient.post<Subject>("/subjects", payload),
  update: (id: string, payload: Partial<Subject>) => apiClient.put<Subject>(`/subjects/${id}`, payload),
  remove: (id: string) => apiClient.remove<{ id: string; deleted: boolean }>(`/subjects/${id}`),
};
