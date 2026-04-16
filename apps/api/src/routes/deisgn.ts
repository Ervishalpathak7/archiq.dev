import fastifyPlugin from "fastify-plugin";
import { designGenerateController } from "../controllers/design/designGenerate.js";
import { getDesignListController } from "../controllers/design/getDesign.js";

const designRoutes = fastifyPlugin((fastify) => {
  fastify.post(
    "/api/generate",
    {
      preHandler: async (req, reply) => {
        await fastify.authenticate(req, reply);
      },
    },
    designGenerateController(fastify),
  );

  fastify.get(
    "/api/design",
    {
      preHandler: async (req, reply) => {
        await fastify.authenticate(req, reply);
      },
    },
    getDesignListController(fastify),
  );

  fastify.get(
    "/api/design/:designId",
    {
      preHandler: async (req, reply) => {
        await fastify.authenticate(req, reply);
      },
    },
    getDesignListController(fastify),
  );
});

export default designRoutes;
