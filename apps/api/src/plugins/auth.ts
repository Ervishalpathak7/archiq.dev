import fp from "fastify-plugin";
import type { JWTPayload } from "../types/index.js";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const authPlugin = fp(async (fastify) => {
  fastify.decorate("authenticate", async (req, reply) => {
    const token = req.cookies?.[`access_token`];
    if (!token) return reply.status(401).send({ error: "Unauthorized" });

    try {
      const payload = jwt.verify(token, config.JWT_ACCESS_SECRET) as JWTPayload;
      req.user = payload;
    } catch {
      return reply.status(401).send({ error: "Invalid or expired token" });
    }
  });
});
