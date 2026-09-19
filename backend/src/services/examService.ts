import { supabase } from "../config/supabase.js";
import type { Exam } from "../types/index.js";

export async function listExams(userId: string): Promise<Exam[]> {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("user_id", userId)
    .order("exam_date", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Exam[];
}

export async function createExam(
  userId: string,
  payload: Pick<Exam, "subject_id" | "exam_date" | "exam_type" | "notes">,
): Promise<Exam> {
  const { data, error } = await supabase
    .from("exams")
    .insert({
      user_id: userId,
      subject_id: payload.subject_id,
      exam_date: payload.exam_date,
      exam_type: payload.exam_type,
      notes: payload.notes,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Exam;
}

export async function updateExam(
  userId: string,
  examId: string,
  payload: Partial<Pick<Exam, "subject_id" | "exam_date" | "exam_type" | "notes">>,
): Promise<Exam> {
  const { data, error } = await supabase
    .from("exams")
    .update({
      subject_id: payload.subject_id,
      exam_date: payload.exam_date,
      exam_type: payload.exam_type,
      notes: payload.notes,
    })
    .eq("id", examId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Exam;
}

export async function deleteExam(userId: string, examId: string): Promise<void> {
  const { error } = await supabase.from("exams").delete().eq("id", examId).eq("user_id", userId);

  if (error) {
    throw error;
  }
}
