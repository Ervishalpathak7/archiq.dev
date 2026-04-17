import type {
  InputJsonValue,
} from "../../generated/prisma/internal/prismaNamespace.js";

export interface Design {
  id?: string;
  title: string;
  description: string | null;
  userPrompt: string;
  techStack: string;
  body: InputJsonValue;
  scale: string;
  traffic: string;
  authorId: string;
}

export interface CreateDesignDTO {
  title: string;
  description: string | null;
  userPrompt: string;
  techStack: string;
  scale: string;
  traffic: string;
  authorId: string;
}

export interface DesignList {
  id: string;
  title: string;
}

export interface UpdateDesignDTO {
  title?: string;
  description?: string;
  userPrompt?: string;
  techStack?: string;
  scale?: string;
  traffic?: string;
}
