import { AppError } from "../../errors/index.js";
import type { AiService } from "../ai/ai.service.js";
import type { DesignRepository } from "./design.repository.js";
import type { CreateDesignRequest } from "./design.schema.js";
import type { UpdateDesignDTO } from "./design.types.js";

export class DesignService {
  constructor(
    private repo: DesignRepository,
    private aiService: AiService,
  ) {}

  async createDesign(
    data: CreateDesignRequest,
    authorId: string,
    callback: (chunk: string) => void,
  ) {
    const aiResult = await this.aiService.generate(data.userPrompt);
    let completeAiResult = "";
    for await (const chunk of aiResult) {
      const content = chunk.choices[0]?.delta?.content || "";
      callback(content);
      completeAiResult += content;
    }
    return await this.repo.create({
      ...data,
      authorId,
      body: JSON.parse(completeAiResult),
    });
  }

  async updateDesign(id: string, authorId: string, design: UpdateDesignDTO) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError("Design not found", "DESIGN_NOT_FOUND");
    if (existing.authorId != authorId)
      throw new AppError("unauthorised access", "UNAUTHORISED");
    return await this.repo.update(id, design);
  }

  async getDesign(id: string, authorId: string) {
    const design = await this.repo.findById(id);
    if (!design) throw new AppError("Design not found", "DESIGN_NOT_FOUND");
    if (design.authorId != authorId)
      throw new AppError("unauthorised access", "UNAUTHORISED");
    return design;
  }
  async getUserDesignList(userId: string) {
    return this.repo.findByAuthor(userId);
  }
  async deleteDesign(id: string, authorId: string) {
    const design = await this.repo.findById(id);
    if (!design) throw new AppError("Design not found", "DESIGN_NOT_FOUND");
    if (design.authorId != authorId)
      throw new AppError("unauthorised access", "UNAUTHORISED");
    return this.repo.delete(id);
  }
}
