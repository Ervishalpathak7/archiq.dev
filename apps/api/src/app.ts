import Fastify from "fastify";
import gracefullShutdown from "./lib/shutdown.js";
import helmet from "@fastify/helmet";
import corsPlugin from "./plugins/cors.js";
import cookiePlugin from "./plugins/cookie.js";
import prismaPlugin from "./plugins/prisma.js";
import clerk from "./plugins/clerk.js";
import fastifyRawBody from "fastify-raw-body";
import healthRoutes from "./routes/health.js";
import aiPlugin from "./plugins/grok.js";
import authPlugin from "./plugins/auth.js";
import { DesignRoutes } from "./modules/design/design.routes.js";
import { UserRoutes } from "./modules/user/user.routes.js";

// Fastify app initialization
const app = Fastify({
  logger: {
    level: "info",
    transport: { target: "pino-pretty" },
  },
  disableRequestLogging: true,
});

// Plugins (order matters — later plugins may depend on earlier ones)
await app.register(helmet);
await app.register(fastifyRawBody, {
  global: false,
});
await app.register(corsPlugin);
await app.register(cookiePlugin);
await app.register(prismaPlugin);   // DB must be ready before auth plugin
await app.register(clerk);          // Clerk SDK initialization
await app.register(authPlugin);     // Auth middleware (needs prisma + clerk)
await app.register(aiPlugin);

// Routes
app.register(healthRoutes, {
  prefix: '/health'
});
app.register(UserRoutes, {
  prefix: '/users'
});
app.register(DesignRoutes, {
  prefix: '/designs'
});


process.on("SIGINT", () => gracefullShutdown(app));
process.on("SIGTERM", () => gracefullShutdown(app));

export default app;
