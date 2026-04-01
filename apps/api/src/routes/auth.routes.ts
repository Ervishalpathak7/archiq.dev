import { createClerkClient, verifyToken } from "@clerk/backend";
import { config } from "../config/index.js";
import type { FastifyInstance } from "fastify";
import { db } from "@archiq/db";
import { setCookie } from "../plugins/cookies.js";

const clerkClient = createClerkClient({
  secretKey: config.CLERK_SECRET_KEY,
});

export async function authRoutes(fastify: FastifyInstance) {
  // Auth sync route
  fastify.post("/auth/sync", async (req, reply) => {
    // 1. Extract clerk token
    const clerkToken = (req.headers.authorization ?? "").split(" ")[1];
    if (!clerkToken)
      return reply.status(401).send({ error: "No token provided" });

    // 2. Verify token with clerk
    let clerkUserId: string;
    try {
      const { sub } = await verifyToken(clerkToken, {
        secretKey: config.CLERK_SECRET_KEY,
      });
      clerkUserId = sub;
    } catch (error) {
      return reply.status(401).send({ error: "Token not verified." });
    }

    // 3. Fetch user details from clerk
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    if (!clerkUser.emailAddresses[0]?.emailAddress)
      return reply.status(401).send({ error: "User email not found." });
    const email = clerkUser.emailAddresses[0].emailAddress;
    const name =
      `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();
    const avatar = clerkUser.imageUrl;

    // 4. Find or create user in our database
    const user = await db.user.upsert({
      where: { clerkId: clerkUserId },
      update: { email, name, avatar },
      create: { clerkId: clerkUserId, email, name, avatar },
    });

    // 5. Generate JWT token
    const token = fastify.jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      { expiresIn: config.JWT_ACCESS_EXPIRES_IN },
    );

    // 6. set token in cookies and send user data
    setCookie(reply, "access_token", token);
    return reply.send({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  });

  // Logout route
  fastify.post("/auth/logout", async (_req, reply) => {
    reply.clearCookie("access_token");
    return reply.send({ ok: true });
  });

  // Profile route
  fastify.get(
    "/auth/profile",
    { preHandler: fastify.authenticate },
    async (req, reply) => {
      const token = req.cookies["access_token"];
      if (!token) return reply.status(401).send({ error: "Unauthorized" });
      const { userId } = fastify.jwt.verify<{ userId: string }>(token);
      const user = await db.user.findUnique({ where: { id: userId } });
      if (!user) return reply.status(401).send({ error: "User not found." });
      return reply.send({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    },
  );
}
