import z from "zod";
import { configDotenv } from "dotenv";

configDotenv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV : z.enum(['DEV' , 'PROD' , 'TEST']).default('DEV'),
  CLIENT_URL : z.url()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(
    `Env parsing failed: ${JSON.stringify(parsedEnv.error.format(), null, 2)}`,
  );
}

const config = parsedEnv.data;
export default config;
