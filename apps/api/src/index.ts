import { config } from "./config/index.js";
import Fastify from "fastify";
import { designRoutes } from "./routes/design.routes.js";
import { corsPlugin } from "./plugins/cors.js";
import { jwtPlugin } from "./plugins/jwt.js";
import { cookiePlugin } from "./plugins/cookies.js";
import { errorHanlder } from "./lib/errorHandler.js";
import { authPlugin } from "./plugins/auth.js";
import { authRoutes } from "./routes/auth.routes.js";

const app = Fastify({
  logger: {
    level: "info",
    ...(config.NODE_ENV !== "production" && {
      transport: { target: "pino-pretty" },
    }),
  },
});

// Register plugins
app.register(corsPlugin);
app.register(jwtPlugin);
app.register(cookiePlugin);
app.register(authPlugin);

// Error handler
app.register(errorHanlder);

// Health check route
app.get("/health", async () => {
  return { status: "ok" };
});

// Auth routes
app.register(authRoutes);

// Design routes
app.register(designRoutes);

// Start server
const start = async () => {
  try {
    await app.listen({ port: config.PORT, host: config.HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

process.on("SIGINT", async () => {
  await app.close();
  app.log.info("Server closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await app.close();
  app.log.info("Server closed");
  process.exit(0);
});
