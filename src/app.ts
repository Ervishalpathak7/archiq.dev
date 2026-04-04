import config from "./config.js";
import Fastify from "fastify";
import gracefullShutdown from "./lib/shutdown.js";
import helmet from "@fastify/helmet";
import corsPlugin from "./plugins/cors.js";
import jwtPlugin from "./plugins/jwt.js";
import cookiePlugin from "./plugins/cookie.js";

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

app.get("/health", async (_req, reply) => {
  reply.send({ message: "Api is running" });
});

// Server instance Initialiser
(async () => {
  app.listen({ port: config.PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      app.log.error("Fail to start server");
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
  });
})();

process.on("SIGINT", () => gracefullShutdown(app));
process.on("SIGTERM", () => gracefullShutdown(app));
