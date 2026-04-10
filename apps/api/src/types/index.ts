import type { Redis } from "ioredis";
import type { PrismaClient } from "../generated/prisma/client.js";
import type Groq from "groq-sdk";

export type DesignSchema = {
  title: string;
  components: { id: string; label: string; type: string }[];
  connections: { id: string; source: string; target: string; label?: string }[];
  lldModules: { name: string; responsibilities: string[] }[];
  techStack: {
    frontend?: string;
    backend?: string;
    database?: string;
    cache?: string;
    queue?: string;
  };
  scalingNotes: string[];
};

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
    redis: Redis;
    ai: Groq;
  }
  interface FastifyRequest {
    userId: string;
  }
}
