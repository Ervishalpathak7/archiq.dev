import type { FastifyInstance } from "fastify";
import { DesignService } from "./design.service.js";
import { DesignRepository } from "./design.repo.js";
import { AiService } from "../ai/ai.service.js";
import { systemPrompt } from "../ai/prompt.js";
import { DesignController } from "./design.controller.js";

export const DesignRoutes = (fastify: FastifyInstance) => {
  const db = fastify.prisma;
  const ai = fastify.ai;
  const repo = new DesignRepository(db);
  const aiService = new AiService(ai, systemPrompt);
  const service = new DesignService(repo, aiService);
  const controller = new DesignController(service);

  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/designs", controller.create);

  fastify.get("/users/me/designs", controller.getByAuthor);

  fastify.get<{ Params: { id: string } }>(
    "/designs/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", minLength: 20 },
          },
          required: ["id"],
        },
      },
    },
    controller.getById,
  );

  fastify.put<{ Params: { id: string } }>(
    "/designs/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", minLength: 20 },
          },
          required: ["id"],
        },
      },
    },
    controller.update,
  );
};
