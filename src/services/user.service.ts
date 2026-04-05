import { AppError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";

async function getUserById(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({ where: { id } });
}

async function createUser(
  prisma: PrismaClient,
  { email, name, password }: { email: string; name: string; password?: string },
) {
  const userExist = await prisma.user.findUnique({
    where: { email },
  });
  if (userExist) {
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
  return user;
}

export { getUserById, createUser };
