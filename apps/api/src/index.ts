import "./lib/env.js";
import Fastify, { type FastifyError } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { designRoutes } from "./routes/design.routes.js";

const app = Fastify({
  logger: {
    level: "info",
    ...(process.env["NODE_ENV"] !== "production" && {
      transport: { target: "pino-pretty" },
    }),
  },
});

// Register plugins
app.register(cors, { origin: "http://localhost:3000" });
app.register(jwt, { secret: process.env["JWT_SECRET"]! });

// Error handler
app.setErrorHandler((error: FastifyError, _, reply) => {
  app.log.error(error);
  reply.status(error.statusCode ?? 500).send({
    success: false,
    error: error.message ?? "Internal Server Error",
  });
});

// Routes
app.get("/health", async () => {
  return { status: "ok" };
});
app.register(designRoutes);

// Start server
const start = async () => {
  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });
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
