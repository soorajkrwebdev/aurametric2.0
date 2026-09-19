import dotenv from "dotenv";

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  clientOrigin: required("CLIENT_ORIGIN", "http://localhost:5173,http://localhost:5174"),
  supabaseUrl: required("SUPABASE_URL"),
  supabaseServiceRoleKey: required("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SECRET_KEY ?? ""),
  hfToken: required("HF_TOKEN"),
  aiModel: required("AI_MODEL"),
};
