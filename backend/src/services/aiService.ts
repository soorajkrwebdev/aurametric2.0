import { env } from "../config/env.js";

const HF_BASE_URL = "https://api-inference.huggingface.co/models";

function cleanGeneratedText(value: string) {
  const normalized = value
    .replace(/\r/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!normalized) {
    return "I’m here to help with that.";
  }

  return normalized
    .replace(/^\s*(assistant|assistant\s*:|AI\s*:)?\s*/i, "")
    .replace(/\s*User:\s*.*$/is, "")
    .trim();
}

export async function generateAssistantReply(message: string): Promise<string> {
  const safeMessage = message.trim();

  if (!safeMessage) {
    return "I’m ready to help with your next task.";
  }

  const response = await fetch(`${HF_BASE_URL}/${encodeURIComponent(env.aiModel)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.hfToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `You are a simple, helpful general-purpose chatbot. Keep answers concise and friendly.\n\nUser: ${safeMessage}\nAssistant:`,
      parameters: {
        max_new_tokens: 220,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "The AI service is unavailable right now.");
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    const generated = payload[0]?.generated_text;
    return cleanGeneratedText(String(generated ?? "I’m here to help with that."));
  }

  if (payload && typeof payload.generated_text === "string") {
    return cleanGeneratedText(payload.generated_text);
  }

  if (payload && Array.isArray(payload[0]?.generated_text)) {
    const generated = payload[0].generated_text[0]?.content;
    return cleanGeneratedText(String(generated ?? "I’m here to help with that."));
  }

  return "I’m here to help with that.";
}
