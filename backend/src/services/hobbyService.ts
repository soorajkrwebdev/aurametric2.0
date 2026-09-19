import { supabase } from "../config/supabase.js";
import type { Hobby } from "../types/index.js";

export async function listHobbies(userId: string): Promise<Hobby[]> {
  const { data, error } = await supabase
    .from("hobbies")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Hobby[];
}

export async function createHobby(
  userId: string,
  payload: Pick<Hobby, "hobby_name" | "hours_spent" | "date" | "notes">,
): Promise<Hobby> {
  const { data, error } = await supabase
    .from("hobbies")
    .insert({
      user_id: userId,
      hobby_name: payload.hobby_name,
      hours_spent: payload.hours_spent,
      date: payload.date,
      notes: payload.notes,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Hobby;
}

export async function updateHobby(
  userId: string,
  hobbyId: string,
  payload: Partial<Pick<Hobby, "hobby_name" | "hours_spent" | "date" | "notes">>,
): Promise<Hobby> {
  const { data, error } = await supabase
    .from("hobbies")
    .update({
      hobby_name: payload.hobby_name,
      hours_spent: payload.hours_spent,
      date: payload.date,
      notes: payload.notes,
    })
    .eq("id", hobbyId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Hobby;
}

export async function deleteHobby(userId: string, hobbyId: string): Promise<void> {
  const { error } = await supabase.from("hobbies").delete().eq("id", hobbyId).eq("user_id", userId);

  if (error) {
    throw error;
  }
}
