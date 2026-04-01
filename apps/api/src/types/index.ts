export interface JWTPayload {
  userId: string;
  email: string;
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: JWTPayload;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
