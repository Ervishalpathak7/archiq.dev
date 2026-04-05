import Fastify from "fastify";
import gracefullShutdown from "./lib/shutdown.js";
import helmet from "@fastify/helmet";
import corsPlugin from "./plugins/cors.js";
import jwtPlugin from "./plugins/jwt.js";
import cookiePlugin from "./plugins/cookie.js";
import prismaPlugin from "./plugins/prisma.js";
import redisPlugin from "./plugins/redis.js";

// Fastify app initialization
const app = Fastify({
  logger: {
    level: "info",
    transport: { target: "pino-pretty" },
  },
});

// Plugins
app.register(helmet);
app.register(corsPlugin);
app.register(cookiePlugin);
app.register(jwtPlugin);
app.register(prismaPlugin);
app.register(redisPlugin);

app.get("/health", async (_req, reply) => {
  reply.send({ message: "Api is running" });
});


process.on("SIGINT", () => gracefullShutdown(app));
process.on("SIGTERM", () => gracefullShutdown(app));

export default app;