import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV : z.enum(['DEV' , 'PROD' , 'TEST']).default('DEV'),
  CLIENT_URL : z.url(),
  JWT_SECRET : z.string(),
  COOKIE_SIGNATURE_KEY : z.string(),
  DATABASE_URL : z.url(),
  REDIS_URL: z.string().default('redis://localhost:6379')
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(
    `Env parsing failed: ${JSON.stringify(parsedEnv.error.format(), null, 2)}`,
  );
}

const config = parsedEnv.data;
export default config;
