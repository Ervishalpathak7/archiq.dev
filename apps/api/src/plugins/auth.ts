import fp from "fastify-plugin";
import type { JWTPayload } from "../types/index.js";

export const authPlugin = fp(async (fastify) => {
  fastify.decorate("authenticate", async (req, reply) => {
    const token = req.cookies?.[`access_token`];
    if (!token) return reply.status(401).send({ error: "Unauthorized" });

    try {
      const payload = fastify.jwt.verify(token) as JWTPayload;
      req.user = payload;
    } catch {
      return reply.status(401).send({ error: "Invalid or expired token" });
    }
  });
});
