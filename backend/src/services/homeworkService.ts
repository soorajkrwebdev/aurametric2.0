import { supabase } from "../config/supabase.js";
import type { Homework } from "../types/index.js";

export async function listHomework(userId: string): Promise<Homework[]> {
  const { data, error } = await supabase
    .from("homework")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Homework[];
}

export async function createHomework(
  userId: string,
  payload: Pick<Homework, "subject_id" | "title" | "description" | "due_date" | "priority" | "status">,
): Promise<Homework> {
  const { data, error } = await supabase
    .from("homework")
    .insert({
      user_id: userId,
      subject_id: payload.subject_id,
      title: payload.title,
      description: payload.description,
      due_date: payload.due_date,
      priority: payload.priority,
      status: payload.status,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Homework;
}

export async function updateHomework(
  userId: string,
  homeworkId: string,
  payload: Partial<Pick<Homework, "subject_id" | "title" | "description" | "due_date" | "priority" | "status">>,
): Promise<Homework> {
  const { data, error } = await supabase
    .from("homework")
    .update({
      subject_id: payload.subject_id,
      title: payload.title,
      description: payload.description,
      due_date: payload.due_date,
      priority: payload.priority,
      status: payload.status,
    })
    .eq("id", homeworkId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Homework;
}

export async function deleteHomework(userId: string, homeworkId: string): Promise<void> {
  const { error } = await supabase.from("homework").delete().eq("id", homeworkId).eq("user_id", userId);

  if (error) {
    throw error;
  }
}
