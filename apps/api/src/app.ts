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
import healthRoutes from "./routes/health.js";
import aiPlugin from "./plugins/ai.js";

// Fastify app initialization
const app = Fastify({
  logger: {
    level: "info",
    transport: { target: "pino-pretty" },
  },
  disableRequestLogging: true,
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
app.register(aiPlugin);

// Routes
app.register(healthRoutes);
app.register(authWebhook);

process.on("SIGINT", () => gracefullShutdown(app));
process.on("SIGTERM", () => gracefullShutdown(app));

export default app;
