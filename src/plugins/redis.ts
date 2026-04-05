import fastifyPlugin from "fastify-plugin";
import { Redis } from "ioredis";
import config from "../config.js";

const redisPlugin = fastifyPlugin(async (fastify) => {
  const redisClient = new Redis(config.REDIS_URL);

  await new Promise<void>((resolve, reject) => {
    redisClient.on("ready", () => {
      fastify.log.info("Redis Connected");
      resolve();
    });
    redisClient.on("error", (err) => {
      reject(new Error(`Redis connection failed: ${err.message}`));
    });
  });
  fastify.decorate("redis", redisClient);

  fastify.addHook("onClose", () => {
    if (redisClient) {
      redisClient.quit();
      fastify.log.info("Redis Disconnected");
    }
  });
});

export default redisPlugin;
