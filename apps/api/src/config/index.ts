import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("0.0.0.0"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  FRONTEND_URL: z.url("FRONTEND_URL is required"),
  DATABASE_URL: z.string("DATABASE_URL is required"),
  JWT_ACCESS_SECRET: z.string().min(10, "JWT_ACCESS_SECRET is required"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_SECRET: z.string().min(10, "JWT_REFRESH_SECRET is required"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  GOOGLE_CLIENT_ID: z.string("GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string("GOOGLE_CLIENT_SECRET is required"),
  AUTH_SECRET: z.string("AUTH_SECRET is required"),
  AUTH_URL: z.url("AUTH_URL is required"),
  CLERK_SECRET_KEY: z.string("CLERK_SECRET_KEY is required"),
  GROQ_API_KEY: z.string("GROQ_API_KEY is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 2),
  );
  process.exit(1);
}

export const config = parsedEnv.data;
