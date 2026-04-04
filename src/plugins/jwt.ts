import fastifyJwt from "@fastify/jwt";
import fastifyPlugin from "fastify-plugin";
import config from "../config.js";

const jwtPlugin = fastifyPlugin((fastify) => {
  fastify.register(fastifyJwt, {
    secret: config.JWT_SECRET,
  });
});

export default jwtPlugin;
