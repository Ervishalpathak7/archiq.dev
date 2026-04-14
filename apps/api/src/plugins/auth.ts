import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getAuth } from "@clerk/fastify";

const authPlugin = fastifyPlugin((fastify) => {
  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
      const { userId, isAuthenticated } = getAuth(req);
      if (!isAuthenticated) {
        reply.status(401).send({ error: "UNAUTHORIZED" });
        return;
      }
      req.userId = userId;
    },
  );
});

export default authPlugin;
