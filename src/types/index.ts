import type { Redis } from "ioredis";
import type { PrismaClient } from "../generated/prisma/client.js";

export interface JWTPayload {
  userId: string;
  role: "user" | "admin";
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: JWTPayload;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    prisma: PrismaClient;
    redis : Redis
  }
}