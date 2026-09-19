import { apiClient } from "./apiClient";
import type { Hobby } from "@/types";

export const hobbyService = {
  list: () => apiClient.get<Hobby[]>("/hobbies"),
  create: (payload: Partial<Hobby>) => apiClient.post<Hobby>("/hobbies", payload),
  update: (id: string, payload: Partial<Hobby>) => apiClient.put<Hobby>(`/hobbies/${id}`, payload),
  remove: (id: string) => apiClient.remove<{ id: string; deleted: boolean }>(`/hobbies/${id}`),
};
