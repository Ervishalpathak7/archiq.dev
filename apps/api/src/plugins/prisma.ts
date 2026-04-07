import fastifyPlugin from "fastify-plugin";
import { prisma } from "../db/index.js";

const prismaPlugin = fastifyPlugin(async (fastify) => {
  try {
    await prisma.$connect();
    fastify.log.info("Database Connected");
    fastify.decorate("prisma", prisma);
    fastify.addHook("onClose", async () => {
      await prisma.$disconnect();
      fastify.log.info("Database Disconnected");
    });
  } catch (error) {
    fastify.log.error(error, "Database connection failed");
    throw error;
  }
});

export default prismaPlugin;
