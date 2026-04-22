import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getAuth } from "@clerk/fastify";

const authPlugin = fastifyPlugin(async (fastify) => {
  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        const auth = getAuth(req);

        if (!auth.userId) {
          reply.status(401).send({
            error: "UNAUTHORIZED",
            message: "Authentication required",
          });
          return;
        }
        const dbUser = await fastify.prisma.user.findUnique({
          where: { clerkId: auth.userId },
          select: { id: true },
        });

        if (!dbUser) {
          fastify.log.warn(
            `Clerk user ${auth.userId} not found in database. Webhook may be pending.`,
          );
          reply.status(403).send({
            error: "USER_NOT_SYNCED",
            message:
              "Your account is being set up. Please try again in a moment.",
          });
          return;
        }

        req.userId = dbUser.id;
      } catch (error) {
        fastify.log.error(error, "Authentication middleware error");
        reply.status(401).send({
          error: "UNAUTHORIZED",
          message: "Authentication failed",
        });
      }
    },
  );
});

export default authPlugin;
