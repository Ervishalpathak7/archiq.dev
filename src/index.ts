import config from "./lib/config.js";
import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.get("/", async (_req, _reply) => {
  return { hello: "world" };
});

app.listen({ port: config.data.port }, (err) => {
  if (err) {
    app.log.error("Fail to start server");
    process.exit(1);
  }
});
