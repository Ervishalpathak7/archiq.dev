import fastifyPlugin from "fastify-plugin";
import { generateDesign } from "../services/design.service.js";
import { closeSSE, initSSE, sendChunk } from "../lib/sse.js";
import { generatePrompt } from "../services/prompt.service.js";

const designRoutes = fastifyPlugin((fastify) => {
  fastify.post("/api/generate", async (req, reply) => {
    const { projectDiscription, type, scale, techStack, traffic } =
      req.body as {
        projectDiscription: string;
        type: string;
        scale: string;
        techStack: string;
        traffic: string;
      };
    const prompt = generatePrompt(
      projectDiscription,
      type,
      scale,
      techStack,
      traffic,
    );
    try {
      initSSE(reply);
      await generateDesign(
        prompt.systemPrompt,
        prompt.userPrompt,
        fastify.ai,
        (text) => sendChunk(reply, text),
      );
      closeSSE(reply);
    } catch (error) {
      reply.status(500).send("Error while generating design");
    }
  });
});

export default designRoutes;
