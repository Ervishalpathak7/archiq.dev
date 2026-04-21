import type { DesignSchema } from "@archiq/types";
import type { InputJsonValue } from "../../generated/prisma/internal/prismaNamespace.js";

export interface CreateDesignDTO {
  title: string;
  description?: string | null;
  userPrompt: string;
  techStack: string;
  body: InputJsonValue;
  scale: "small" | "medium" | "large";
  traffic: "low" | "moderate" | "high";
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
  scale?: "small" | "medium" | "large";
  traffic?: "low" | "moderate" | "high";
}

