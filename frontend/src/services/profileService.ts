import { apiClient } from "./apiClient";
import type { StudentProfile } from "@/types";

export const profileService = {
  get: () => apiClient.get<StudentProfile>("/profile"),
  update: (payload: Partial<StudentProfile>) => apiClient.put<StudentProfile>("/profile", payload),
};
