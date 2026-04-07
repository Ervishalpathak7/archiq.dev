import config from "../config.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certPath = path.resolve(__dirname, "../../certs/ca-certificate.crt");

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance = globalForPrisma.prisma;

if (!prismaInstance) {
  const adapter = new PrismaPg({
    connectionString: config.DATABASE_URL,
    ssl: {
      ca: fs.readFileSync(certPath, "utf-8"),
      rejectUnauthorized: true, // equivalent to verify-full
    },
  });

  prismaInstance = new PrismaClient({ adapter });
}

export const prisma = prismaInstance;

// Cache only in non-production (prevents hot-reload connection explosion)
if (config.NODE_ENV !== "PROD") {
  globalForPrisma.prisma = prisma;
}
