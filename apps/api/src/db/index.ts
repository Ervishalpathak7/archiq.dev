import config from "../config.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance = globalForPrisma.prisma;

if (!prismaInstance) {
  const adapter = new PrismaPg({ connectionString: config.DATABASE_URL });
  prismaInstance = new PrismaClient({ adapter });
}

export const prisma = prismaInstance;

// Cache only in non-production (prevents hot-reload connection explosion)
if (config.NODE_ENV !== "PROD") {
  globalForPrisma.prisma = prisma;
}
