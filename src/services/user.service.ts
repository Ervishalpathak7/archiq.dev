import type { Redis } from "ioredis";
import { AppError } from "../errors/index.js";
import type { PrismaClient, User } from "../generated/prisma/client.js";
import { getCache, setCache } from "../plugins/redis.js";

async function getUserById(prisma: PrismaClient, redis: Redis, id: string) {
  let user: User | null = await getCache(redis, `user:${id}`);
  if (user) {
    return user;
  } else {
    user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      user.password = null;
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
  { email, name, password }: { email: string; name: string; password?: string },
) {
  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (userExist) {
    setCache(redis, `user:${userExist.id}`, userExist).catch((err) => {
      console.error("Error while saving cache ", err);
    });
    throw new AppError(
      "User already exist with this email",
      "USER_ALREADY_EXIST",
    );
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: password ?? null,
      name,
    },
  });

  setCache(redis, `user:${user.id}`, user).catch((err) => {
    console.error("Error while saving cache ", err);
  });

  return user;
}

export { getUserById, createUser };
