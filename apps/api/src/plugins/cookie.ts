import fastifyCookie from "@fastify/cookie";
import fastifyPlugin from "fastify-plugin";
import config from "../config.js";
import type { FastifyReply } from "fastify";

const cookiePlugin = fastifyPlugin((app) => {
  app.register(fastifyCookie, {
    secret: config.COOKIE_SIGNATURE_KEY,
  });
});

export const setCookie = async (
  reply: FastifyReply,
  key: string,
  value: string,
  age: number,
) => {
  reply.setCookie(key, value, {
    httpOnly: true,
    secure: true,
    sameSite: config.NODE_ENV === "PROD" ? "strict" : "lax",
    path: "/",
    maxAge: age,
  });
};

export const clearCookie = async (reply: FastifyReply, key: string) => {
  reply.clearCookie(key, {
    path: "/",
  });
};

export default cookiePlugin;
