import type { FastifyReply } from "fastify";
import config from "../config.js";

export const initSSE = (reply: FastifyReply) => {
  reply.raw.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
    "access-control-allow-origin": config.CLIENT_URL,
    "access-control-allow-credentials": "true",
  });
  reply.hijack();
};

export const sendChunk = (reply: FastifyReply, data: string) => {
  reply.raw.write(`data: ${data}\n\n`);
};

export const closeSSE = (reply: FastifyReply, data: string) => {
  reply.raw.end({ data });
};
