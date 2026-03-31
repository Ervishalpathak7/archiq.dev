export const DESIGN_JSON_SCHEMA = {
  title: "string",
  components: [{ id: "string", label: "string", type: "string" }],
  connections: [{ from: "string", to: "string", label: "string (optional)", protocol: "string (optional)" }],
  techStack: {
    frontend: "string (optional)",
    backend: "string (optional)",
    database: "string (optional)",
    cache: "string (optional)",
    queue: "string (optional)",
    infra: "string (optional)",
  },
  scalingNotes: ["string"],
  lldModules: [{
    name: "string",
    responsibilities: ["string"],
    endpoints: ["string (optional)"],
    schema: "string (optional)",
  }],
} as const;

export type ScaleType = "small" | "medium" | "large" | "ai_choose";
export type ArchitectureType =
  | "monolith"
  | "microservices"
  | "serverless"
  | "ai_choose";

export interface DesignRequest {
  projectDescription: string;
  features: {
    name: string;
    description?: string;
  }[];
  scale: ScaleType;
  architectureType: ArchitectureType;
  techPreferences: {
    frontend?: string | "ai_choose";
    backend?: string | "ai_choose";
    database?: string | "ai_choose";
    cache?: string | "ai_choose";
    queue?: string | "ai_choose";
  };
}
