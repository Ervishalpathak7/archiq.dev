export type Plan = "free" | "pro" | "max";

export type User = {
  id: string;
  firstName: string;
  fullName: string;
  emailAddress: string;
  plan: Plan;
};

export type DesignSummary = {
  id: string;
  title: string;
  createdAt: number;
  prompt: string;
};

export type Architecture = {
  id: string;
  title: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
};

export type ArchNode = {
  id: string;
  position: { x: number; y: number };
  data: ArchNodeData;
};

export type ArchNodeData = {
  kind: ArchNodeType;
  label: string;
  sublabel?: string;
  ghost?: boolean;
};

export type ArchEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
};

export type ArchNodeType =
  | "client"
  | "gateway"
  | "service"
  | "database"
  | "cache"
  | "queue"
  | "storage"
  | "ai"
  | "external"
  | "auth"
  | "cdn";
