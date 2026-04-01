import fp from "fastify-plugin";
import cors from "@fastify/cors";
import { config } from "../config/index.js";

export const corsPlugin = fp(async (fastify) => {
  fastify.register(cors, {
    origin: (origin, callback) => {
      if (config.FRONTEND_URL && origin === config.FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 60 * 60 * 24,
  });
});
