import Fastify from "fastify";
import gracefullShutdown from "./lib/shutdown.js";
import helmet from "@fastify/helmet";
import corsPlugin from "./plugins/cors.js";
import cookiePlugin from "./plugins/cookie.js";
import prismaPlugin from "./plugins/prisma.js";
import clerk from "./plugins/clerk.js";
import fastifyRawBody from "fastify-raw-body";
// import authWebhook from "./webhooks/auth.js";
import healthRoutes from "./routes/health.js";
import aiPlugin from "./plugins/grok.js";
// import designRoutes from "./routes/deisgn.js";
import authPlugin from "./plugins/auth.js";
import { DesignRoutes } from "./modules/design/design.route.js";

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
app.register(healthRoutes);
// app.register(authWebhook);
// app.register(designRoutes);
app.register(DesignRoutes);


process.on("SIGINT", () => gracefullShutdown(app));
process.on("SIGTERM", () => gracefullShutdown(app));

export default app;
