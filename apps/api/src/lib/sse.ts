import type { FastifyReply } from "fastify";

export const initSSE = (reply: FastifyReply) => {
  reply.raw.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
    "Access-Control-Allow-Origin": "*", 
  });
};

export const sendChunk = (reply: FastifyReply, data: string) => {
  reply.raw.write(`data: ${data}\n\n`);
};

export const closeSSE = (reply: FastifyReply) => {
  reply.raw.end();
};
