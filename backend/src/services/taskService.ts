import { supabase } from "../config/supabase.js";
import type { Task } from "../types/index.js";

export async function listTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Task[];
}

export async function createTask(
  userId: string,
  payload: Pick<Task, "task_title" | "status" | "priority" | "due_date">,
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userId,
      task_title: payload.task_title,
      status: payload.status,
      priority: payload.priority,
      due_date: payload.due_date,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Task;
}

export async function updateTask(
  userId: string,
  taskId: string,
  payload: Partial<Pick<Task, "task_title" | "status" | "priority" | "due_date">>,
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      task_title: payload.task_title,
      status: payload.status,
      priority: payload.priority,
      due_date: payload.due_date,
    })
    .eq("id", taskId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Task;
}

export async function deleteTask(userId: string, taskId: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId).eq("user_id", userId);

  if (error) {
    throw error;
  }
}
