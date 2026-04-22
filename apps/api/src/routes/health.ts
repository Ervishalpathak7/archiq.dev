import type { FastifyInstance } from "fastify";

const healthRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", async (_req, reply) => {
    try {
      await fastify.prisma.$queryRaw`SELECT 1`;
      return reply.send({
        status: "ok",
        db: "up",
        redis: "up",
      });
    } catch (error) {
      fastify.log.error(error, "Error in Health Check");
      return reply.status(500).send({
        status: "error",
        error: "Depencency failure",
      });
    }
  });
};

export default healthRoutes;
