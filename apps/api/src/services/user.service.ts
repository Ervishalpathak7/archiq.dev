// import type { PrismaClient } from "../generated/prisma/client.js";

// async function getUserById(prisma: PrismaClient, id: string) {
//   return await prisma.user.findUnique({ where: { id } });
// }

// async function createUser(
//   prisma: PrismaClient,
//   {
//     email,
//     name,
//     clerkId,
//     avatar,
//   }: {
//     email: string;
//     name: string;
//     clerkId: string;
//     avatar: string;
//   },
// ) {
//   return await prisma.user.upsert({
//     where: { clerkId },
//     update: { email, name, avatar },
//     create: { email, name, avatar, clerkId },
//   });
// }

// export { getUserById, createUser };
