// import {
//   type FastifyInstance,
//   type FastifyReply,
//   type FastifyRequest,
// } from "fastify";
// import {
//   getDesignDataById,
//   getDesignListService,
// } from "../../services/design.service.js";

// export const getDesignListController =
//   (fastify: FastifyInstance) =>
//   async (req: FastifyRequest, reply: FastifyReply) => {
//     const designList = await getDesignListService(fastify.prisma, req.userId);
//     reply.status(200).send({
//       designs: designList,
//     });
//   };

// export const getDesignController =
//   (fastify: FastifyInstance) =>
//   async (req: FastifyRequest, reply: FastifyReply) => {
//     const designId = (req.params as { designId: string }).designId;
//     const designData = await getDesignDataById(fastify.prisma, designId);
//     reply.status(200).send({
//       data: designData,
//     });
//   };
