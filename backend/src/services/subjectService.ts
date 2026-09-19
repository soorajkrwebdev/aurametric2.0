import { supabase } from "../config/supabase.js";
import type { Subject } from "../types/index.js";

export async function listSubjects(userId: string): Promise<Subject[]> {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Subject[];
}

export async function createSubject(
  userId: string,
  payload: Pick<Subject, "name" | "code" | "semester">,
): Promise<Subject> {
  const { data, error } = await supabase
    .from("subjects")
    .insert({
      user_id: userId,
      name: payload.name,
      code: payload.code,
      semester: payload.semester,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Subject;
}

export async function updateSubject(
  userId: string,
  subjectId: string,
  payload: Partial<Pick<Subject, "name" | "code" | "semester">>,
): Promise<Subject> {
  const { data, error } = await supabase
    .from("subjects")
    .update({
      name: payload.name,
      code: payload.code,
      semester: payload.semester,
    })
    .eq("id", subjectId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Subject;
}

export async function deleteSubject(userId: string, subjectId: string): Promise<void> {
  const { error } = await supabase.from("subjects").delete().eq("id", subjectId).eq("user_id", userId);

  if (error) {
    throw error;
  }
}
