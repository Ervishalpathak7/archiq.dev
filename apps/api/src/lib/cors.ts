import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 60 * 60 * 24,
  });
});
