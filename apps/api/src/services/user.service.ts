import type { Redis } from "ioredis";
import type { PrismaClient, User } from "../generated/prisma/client.js";
import { getCache, setCache } from "../plugins/redis.js";
import { AppError } from "../errors/index.js";

async function getUserById(prisma: PrismaClient, redis: Redis, id: string) {
  let user: User | null = await getCache(redis, `user:${id}`);
  if (user) {
    return user;
  } else {
    user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      setCache(redis, `user:${user.id}`, user).catch((err) => {
        console.error("Error while saving cache ", err);
      });
    }
    return user;
  }
}
async function createUser(
  prisma: PrismaClient,
  redis: Redis,
  {
    email,
    name,
    clerkId,
    avatar,
    password,
  }: {
    email: string;
    name: string;
    clerkId: string;
    avatar: string;
    password?: string;
  },
) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { email, name, avatar },
      create: { email, name, avatar, clerkId, password: password ?? null },
    });
    setCache(redis, `user:${user.id}`, user).catch((err) => {
      console.error("Error while saving cache", err);
    });
    return user;
  } catch (error) {
    console.log("Error in Db query", error);
    throw new AppError("Error in prisma", "PRISMA_ERROR");
  }
}

export { getUserById, createUser };
