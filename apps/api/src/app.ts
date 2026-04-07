import Fastify from "fastify";
import gracefullShutdown from "./lib/shutdown.js";
import helmet from "@fastify/helmet";
import corsPlugin from "./plugins/cors.js";
import jwtPlugin from "./plugins/jwt.js";
import cookiePlugin from "./plugins/cookie.js";
import prismaPlugin from "./plugins/prisma.js";
import redisPlugin from "./plugins/redis.js";
import clerk from "./plugins/clerk.js";
import fastifyRawBody from "fastify-raw-body";
import authWebhook from "./webhooks/auth.js";

// Fastify app initialization
const app = Fastify({
  logger: {
    level: "info",
    transport: { target: "pino-pretty" },
  },
});

// Plugins
app.register(helmet);
app.register(fastifyRawBody, {
  global: false,
});
app.register(corsPlugin);
app.register(cookiePlugin);
app.register(jwtPlugin);
app.register(prismaPlugin);
app.register(redisPlugin);
app.register(clerk);

app.get("/health", async (_req, reply) => {
  reply.send({ message: "Api is running" });
});

app.get("/test", async (req, reply) => {
  try {
    const user = await app.prisma.user.create({
      data: {
        avatar: "heelo",
        email: "vishal",
        name: "vishal",
        clerkId: "nksdjkhskvlv",
      },
    });
    return reply.status(200).send({
      data: user,
    });
  } catch (error) {
    console.log("Error ", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
});

app.register(authWebhook);

process.on("SIGINT", () => gracefullShutdown(app));
process.on("SIGTERM", () => gracefullShutdown(app));

export default app;
