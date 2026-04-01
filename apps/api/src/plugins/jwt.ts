import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { config } from "../config/index.js";

export const jwtPlugin = fp(async (fastify) => {
  fastify.register(jwt, { secret: config.JWT_ACCESS_SECRET });
});
