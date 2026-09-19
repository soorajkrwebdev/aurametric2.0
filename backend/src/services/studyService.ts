import { supabase } from "../config/supabase.js";
import type { StudySession } from "../types/index.js";

export async function listStudySessions(userId: string): Promise<StudySession[]> {
  const { data, error } = await supabase
    .from("study_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("study_date", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as StudySession[];
}

export async function createStudySession(
  userId: string,
  payload: Pick<StudySession, "subject_id" | "topic" | "study_date" | "duration" | "notes">,
): Promise<StudySession> {
  const { data, error } = await supabase
    .from("study_sessions")
    .insert({
      user_id: userId,
      subject_id: payload.subject_id,
      topic: payload.topic,
      study_date: payload.study_date,
      duration: payload.duration,
      notes: payload.notes,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as StudySession;
}

export async function updateStudySession(
  userId: string,
  studySessionId: string,
  payload: Partial<Pick<StudySession, "subject_id" | "topic" | "study_date" | "duration" | "notes">>,
): Promise<StudySession> {
  const { data, error } = await supabase
    .from("study_sessions")
    .update({
      subject_id: payload.subject_id,
      topic: payload.topic,
      study_date: payload.study_date,
      duration: payload.duration,
      notes: payload.notes,
    })
    .eq("id", studySessionId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as StudySession;
}

export async function deleteStudySession(userId: string, studySessionId: string): Promise<void> {
  const { error } = await supabase.from("study_sessions").delete().eq("id", studySessionId).eq("user_id", userId);

  if (error) {
    throw error;
  }
}
