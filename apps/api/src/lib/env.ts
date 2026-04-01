import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import envSchema from "../schemas/env.schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const env = envSchema.parse(process.env);

export default env;
