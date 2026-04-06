import config from "../config.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: config.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
