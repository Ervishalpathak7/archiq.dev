import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import type { FastifyReply } from "fastify";
import { config } from "../config/index.js";

export const cookiePlugin = fp(async (fastify) => {
  fastify.register(fastifyCookie, {});
});

export const setCookie = (reply: FastifyReply, name: string, value: string) => {
  reply.setCookie(name, value, {
    httpOnly: config.NODE_ENV === "production",
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearCookie = (reply: FastifyReply, name: string) => {
  reply.clearCookie(name, {
    httpOnly: config.NODE_ENV === "production",
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};
