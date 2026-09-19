import { apiClient } from "./apiClient";
import type { StudySession } from "@/types";

export const studyService = {
  list: () => apiClient.get<StudySession[]>("/study-sessions"),
  create: (payload: Partial<StudySession>) => apiClient.post<StudySession>("/study-sessions", payload),
  update: (id: string, payload: Partial<StudySession>) =>
    apiClient.put<StudySession>(`/study-sessions/${id}`, payload),
  remove: (id: string) => apiClient.remove<{ id: string; deleted: boolean }>(`/study-sessions/${id}`),
};
