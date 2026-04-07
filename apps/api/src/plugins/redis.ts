import fastifyPlugin from "fastify-plugin";
import { Redis } from "ioredis";
import config from "../config.js";

const redisPlugin = fastifyPlugin(async (fastify) => {
  const redisClient = new Redis(config.REDIS_URL);

  await new Promise<void>(async (resolve, reject) => {
    redisClient.on("ready", async () => {
      await redisClient.ping();
      fastify.log.info("Redis ready");
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

export async function getCache<T>(
  redis: Redis,
  key: string,
): Promise<T | null> {
  const raw = await redis.get(key);
  if (!raw) return null;
  return JSON.parse(raw) as T;
}

export async function setCache(
  redis: Redis,
  key: string,
  value: unknown,
): Promise<void> {
  await redis.set(key, JSON.stringify(value));
}

export default redisPlugin;
