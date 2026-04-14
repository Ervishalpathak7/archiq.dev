import fastifyPlugin from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import config from "../config.js";

const corsPlugin = fastifyPlugin((fastify) => {
  fastify.register(fastifyCors, {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (
        config.NODE_ENV === "DEV" ||
        (config.CLIENT_URL && origin === config.CLIENT_URL)
      ) {
        callback(null, origin);
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

export default corsPlugin;
