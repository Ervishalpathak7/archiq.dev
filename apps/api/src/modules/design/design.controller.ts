import type { FastifyReply, FastifyRequest } from "fastify";
import type { DesignService } from "./design.service.js";
import { initSSE, sendChunk, closeSSE } from "../../lib/sse.js";
import {
  CreateDesignRequestSchema,
  ParamsSchema,
  UpdateDesignRequestSchema,
} from "./design.schema.js";

export class DesignController {
  constructor(private service: DesignService) {}

  create = async (req: FastifyRequest, reply: FastifyReply) => {
    const authorId = req.userId;
    const data = CreateDesignRequestSchema.parse(req.body);
    initSSE(reply);
    const design = await this.service.createDesign(
      data,
      authorId,
      () => sendChunk,
    );
    closeSSE(reply, JSON.stringify(design));
  };

  getByAuthor = async (req: FastifyRequest, reply: FastifyReply) => {
    const authorId = req.userId;
    const designs = await this.service.getUserDesignList(authorId);
    return reply.status(200).send({ data: designs });
  };

  getById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const designId = ParamsSchema.parse(req.params).id;
    const design = await this.service.getDesign(designId, req.userId);
    return reply.status(200).send({ data: design });
  };

  update = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const authorId = req.userId;
    const designId = ParamsSchema.parse(req.params).id;
    const data = UpdateDesignRequestSchema.parse(req.body);
    const updatedDesign = await this.service.updateDesign(
      designId,
      authorId,
      data,
    );
    return reply.status(200).send({ data: updatedDesign });
  };
}
