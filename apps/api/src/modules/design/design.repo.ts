import type { PrismaClient } from "../../generated/prisma/client.js";
import type { CreateDesignDTO, UpdateDesignDTO } from "./design.types.js";

export class DesignRepository {
  constructor(private db: PrismaClient) {}

  async create(data: CreateDesignDTO) {
    return this.db.design.create({ data });
  }

  async findById(id: string) {
    return this.db.design.findUnique({ where: { id } });
  }

  async findByAuthor(authorId: string) {
    return this.db.design.findMany({
      where: { authorId },
      select: { id: true, title: true },
    });
  }

  async update(id: string, data: UpdateDesignDTO) {
    return this.db.design.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.db.design.delete({ where: { id } });
  }
}
