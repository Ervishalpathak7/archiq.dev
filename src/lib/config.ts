import z from "zod";
import { configDotenv } from "dotenv";

configDotenv();

const envSchema = z.object({
  port: z.number().default(3000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(
    `Env parsing failed: ${JSON.stringify(parsedEnv.error.format(), null, 2)}`,
  );
}

const config = parsedEnv.data;
export default config;
