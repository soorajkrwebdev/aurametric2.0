import { supabase } from "../config/supabase.js";
import { generateAssistantReply } from "./aiService.js";
import type { ChatMessage } from "../types/index.js";

export async function listChatMessages(userId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as ChatMessage[];
}

export async function sendChatMessage(userId: string, message: string): Promise<string> {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    throw Object.assign(new Error("Message is required."), {
      statusCode: 400,
      code: "VALIDATION_ERROR",
    });
  }

  const { error: userInsertError } = await supabase.from("chat_messages").insert({
    user_id: userId,
    role: "user",
    message: trimmedMessage,
  });

  if (userInsertError) {
    throw userInsertError;
  }

  let assistantMessage = "I’m here to help with that.";

  try {
    assistantMessage = await generateAssistantReply(trimmedMessage);
  } catch (error) {
    const fallback = error instanceof Error ? error.message : "The AI service is unavailable right now.";
    assistantMessage = fallback.length > 180 ? "The AI service is unavailable right now. Please try again in a moment." : fallback;
  }

  const { error: replyInsertError } = await supabase.from("chat_messages").insert({
    user_id: userId,
    role: "assistant",
    message: assistantMessage,
  });

  if (replyInsertError) {
    throw replyInsertError;
  }

  return assistantMessage;
}
