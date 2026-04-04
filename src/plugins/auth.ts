import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import type { JWTPayload } from "../types/index.js";

const authPlugin = fastifyPlugin(async (fastify) => {
  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const access_token = req.cookies?.["access_token"];
      if (!access_token)
        return reply.status(401).send({ error: "unauthorized" });
      try {
        const payload = fastify.jwt.verify(access_token) as JWTPayload;
        req.user = payload;
      } catch (error) {
        reply.status(401).send({ error: "invalid or expired token" });
      }
    },
  );
});

export default authPlugin;
