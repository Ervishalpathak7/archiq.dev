import fastifyPlugin from "fastify-plugin";
import { createDesign } from "../services/design.service.js";
import { closeSSE, initSSE, sendChunk } from "../lib/sse.js";
import { generatePrompt } from "../services/prompt.service.js";

const designRoutes = fastifyPlugin((fastify) => {
  fastify.post(
    "/api/generate",
    {
      preHandler: async (req, reply) => {
        await fastify.authenticate(req, reply);
      },
    },

    async (req, reply) => {
      const {
        description,
        scale,
        type = "full stack",
        techStack,
        traffic,
      } = req.body as {
        description: string;
        scale: string;
        type: string;
        techStack: string;
        traffic: string;
      };
      const prompt = generatePrompt(
        description,
        type,
        scale,
        techStack,
        traffic,
      );
      try {
        initSSE(reply);
        await createDesign(
          req.userId,
          {
            title: "random-for-now",
            description,
            techStack,
            userPrompt: prompt.userPrompt,
            systemPrompt: prompt.systemPrompt,
          },
          fastify.ai,
          (text: string) => sendChunk(reply, text),
          fastify.prisma,
        );
        closeSSE(reply);
      } catch (error) {
        reply.raw.end();
      }
    },
  );
});

export default designRoutes;
