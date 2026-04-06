import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getAuth } from "@clerk/fastify";

const authPlugin = fastifyPlugin(async (fastify) => {
  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { userId, isAuthenticated } = getAuth(req);
      if (!isAuthenticated)
        return reply.status(401).send({ error: "UNAUTHORIZED" });
      req.userId = userId;
    },
  );
});

export default authPlugin;
