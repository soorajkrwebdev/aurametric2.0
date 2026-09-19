import { supabase } from "../config/supabase.js";
import type { Profile } from "../types/index.js";

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Profile | null;
}

export async function updateProfile(userId: string, payload: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: payload.name,
      email: payload.email,
      college: payload.college,
      course: payload.course,
      semester: payload.semester,
      section: payload.section,
      profile_image: payload.profile_image,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Profile;
}
