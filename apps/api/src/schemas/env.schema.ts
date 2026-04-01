import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url("DATABASE_URL is required"),
  CLERK_SECRET_KEY: z.string("CLERK_SECRET_KEY is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string("PORT is required"),
  FRONTEND_URL: z.url("FRONTEND_URL is required"),
  JWT_SECRET: z.string("JWT_SECRET is required"),
  JWT_REFRESH_SECRET: z.string("JWT_REFRESH_SECRET is required"),
  JWT_ACCESS_TOKEN_EXPIRY: z.string("JWT_ACCESS_TOKEN_EXPIRY is required"),
  JWT_REFRESH_TOKEN_EXPIRY: z.string("JWT_REFRESH_TOKEN_EXPIRY is required"),
});

export default envSchema;
