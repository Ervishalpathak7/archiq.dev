// import { closeSSE, initSSE, sendChunk } from "../../lib/sse.js";
// import { createDesign } from "../../services/design.service.js";
// import { generatePrompt } from "../../services/prompt.service.js";
// import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// export const designGenerateController =
//   (fastify: FastifyInstance) =>
//   async (req: FastifyRequest, reply: FastifyReply) => {
//     const {
//       description,
//       scale,
//       type = "full stack",
//       techStack,
//       traffic,
//     } = req.body as {
//       description: string;
//       scale: string;
//       type: string;
//       techStack: string;
//       traffic: string;
//     };
//     const prompt = generatePrompt(description, type, scale, techStack, traffic);
//     try {
//       initSSE(reply);
//       try {
//         await createDesign(
//           req.userId,
//           {
//             title: "random-for-now",
//             description,
//             techStack,
//             userPrompt: prompt.userPrompt,
//             systemPrompt: prompt.systemPrompt,
//           },
//           fastify.ai,
//           (text: string) => sendChunk(reply, text),
//           fastify.prisma,
//         );
//       } catch (error) {
//         fastify.log.error(error);
//       }
//     } catch (error) {
//       fastify.log.error(error);
//     } finally {
//       closeSSE(reply);
//     }
//   };
