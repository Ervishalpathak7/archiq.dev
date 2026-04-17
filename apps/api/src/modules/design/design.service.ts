import { AppError } from "../../errors/index.js";
import type { AiService } from "../ai/ai.service.js";
import type { DesignRepository } from "./design.repo.js";
import type {
  CreateDesignDTO,
  Design,
  UpdateDesignDTO,
} from "./design.types.js";

export class DesignService {
  constructor(
    private repo: DesignRepository,
    private aiService: AiService,
  ) {}

  async createDesign(data: CreateDesignDTO, callback: Function) {
    const aiResult = await this.aiService.generate(data.userPrompt);
    let completeAiResult = "";
    for await (const chunks of aiResult) {
      callback(chunks);
      completeAiResult += chunks;
    }
    const design: Design = {
      ...data,
      body: JSON.parse(completeAiResult),
    };
    return await this.repo.create(design);
  }

  async updateDesign(authorId: string, design: UpdateDesignDTO) {
    return await this.repo.update(authorId, design);
  }

  async getDesign(id: string, authorId: string) {
    const design = await this.repo.findById(id);
    if (!design) throw new AppError("design not found", "DESIGN_NOT_FOUND");
    if (design.authorId != authorId)
      throw new AppError("unauthorised access", "UNAUTHORISED");
    return design;
  }
  async getUserDesignList(userId: string) {
    return this.repo.findByAuthor(userId);
  }
  async deleteDesign(id: string, authorId: string) {
    const design = await this.repo.findById(id);
    if (!design) throw new AppError("design not found", "DESIGN_NOT_FOUND");
    if (design.authorId != authorId)
      throw new AppError("unauthorised access", "UNAUTHORISED");
    return this.repo.delete(id);
  }
}
