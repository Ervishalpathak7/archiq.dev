import type { FastifyError } from "fastify";
import fp from "fastify-plugin";

export const errorHanlder = fp(async (fastify) => {
  fastify.setErrorHandler((error: FastifyError, _, reply) => {
    fastify.log.error(error);
    reply.status(error.statusCode ?? 500).send({
      success: false,
      error: error.message ?? "Internal Server Error",
    });
  });
});
