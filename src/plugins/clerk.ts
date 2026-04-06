import fastifyPlugin from "fastify-plugin";
import { clerkPlugin } from "@clerk/fastify";
import config from "../config.js";

const clerk = fastifyPlugin((fastify) => {
  fastify.register(clerkPlugin, {
    secretKey: config.CLERK_SECRET_KEY,
    publishableKey: config.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  });
});

export default clerk;
