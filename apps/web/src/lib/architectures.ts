/**
 * Pre-built mock system architectures.
 * Picked by keyword from the user's prompt to simulate AI generation.
 */

export type ArchNodeKind =
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

export type ArchNode = {
  id: string;
  kind: ArchNodeKind;
  label: string;
  sublabel?: string;
  position: { x: number; y: number };
};

export type ArchEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  animated?: boolean;
};

export type Architecture = {
  title: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
};

const ecommerce: Architecture = {
  title: "E-commerce platform",
  nodes: [
    {
      id: "web",
      kind: "client",
      label: "Web App",
      sublabel: "Next.js",
      position: { x: 40, y: 200 },
    },
    {
      id: "mobile",
      kind: "client",
      label: "Mobile App",
      sublabel: "React Native",
      position: { x: 40, y: 360 },
    },
    {
      id: "cdn",
      kind: "cdn",
      label: "CDN",
      sublabel: "Cloudflare",
      position: { x: 260, y: 80 },
    },
    {
      id: "gw",
      kind: "gateway",
      label: "API Gateway",
      sublabel: "Kong",
      position: { x: 260, y: 280 },
    },
    {
      id: "auth",
      kind: "auth",
      label: "Auth Service",
      sublabel: "OAuth 2.0",
      position: { x: 500, y: 100 },
    },
    {
      id: "catalog",
      kind: "service",
      label: "Catalog Service",
      position: { x: 500, y: 220 },
    },
    {
      id: "cart",
      kind: "service",
      label: "Cart Service",
      position: { x: 500, y: 320 },
    },
    {
      id: "orders",
      kind: "service",
      label: "Orders Service",
      position: { x: 500, y: 420 },
    },
    {
      id: "payments",
      kind: "external",
      label: "Stripe",
      sublabel: "Payments",
      position: { x: 760, y: 420 },
    },
    {
      id: "pgsql",
      kind: "database",
      label: "Postgres",
      sublabel: "Primary DB",
      position: { x: 760, y: 220 },
    },
    {
      id: "redis",
      kind: "cache",
      label: "Redis",
      sublabel: "Cache",
      position: { x: 760, y: 320 },
    },
    {
      id: "queue",
      kind: "queue",
      label: "RabbitMQ",
      sublabel: "Order events",
      position: { x: 760, y: 520 },
    },
    {
      id: "search",
      kind: "service",
      label: "Search",
      sublabel: "Elasticsearch",
      position: { x: 1000, y: 220 },
    },
  ],
  edges: [
    { id: "e1", sourceId: "web", targetId: "cdn", animated: true },
    { id: "e2", sourceId: "web", targetId: "gw", animated: true },
    { id: "e3", sourceId: "mobile", targetId: "gw", animated: true },
    { id: "e4", sourceId: "gw", targetId: "auth", label: "JWT" },
    { id: "e5", sourceId: "gw", targetId: "catalog" },
    { id: "e6", sourceId: "gw", targetId: "cart" },
    { id: "e7", sourceId: "gw", targetId: "orders" },
    { id: "e8", sourceId: "catalog", targetId: "pgsql" },
    { id: "e9", sourceId: "cart", targetId: "redis" },
    { id: "e10", sourceId: "orders", targetId: "pgsql" },
    { id: "e11", sourceId: "orders", targetId: "payments", animated: true },
    { id: "e12", sourceId: "orders", targetId: "queue", animated: true },
    { id: "e13", sourceId: "catalog", targetId: "search" },
  ],
};

const realtimeChat: Architecture = {
  title: "Real-time chat backend",
  nodes: [
    {
      id: "client",
      kind: "client",
      label: "Chat Clients",
      sublabel: "Web + Mobile",
      position: { x: 40, y: 280 },
    },
    {
      id: "lb",
      kind: "gateway",
      label: "Load Balancer",
      sublabel: "WebSocket",
      position: { x: 280, y: 280 },
    },
    {
      id: "ws1",
      kind: "service",
      label: "WS Gateway 1",
      position: { x: 520, y: 180 },
    },
    {
      id: "ws2",
      kind: "service",
      label: "WS Gateway 2",
      position: { x: 520, y: 380 },
    },
    {
      id: "auth",
      kind: "auth",
      label: "Auth",
      sublabel: "JWT",
      position: { x: 280, y: 100 },
    },
    {
      id: "presence",
      kind: "cache",
      label: "Redis Pub/Sub",
      sublabel: "Presence",
      position: { x: 760, y: 280 },
    },
    {
      id: "msg",
      kind: "service",
      label: "Message Service",
      position: { x: 1000, y: 180 },
    },
    {
      id: "media",
      kind: "service",
      label: "Media Service",
      position: { x: 1000, y: 380 },
    },
    {
      id: "db",
      kind: "database",
      label: "Cassandra",
      sublabel: "Messages",
      position: { x: 1240, y: 180 },
    },
    {
      id: "s3",
      kind: "storage",
      label: "Object Storage",
      sublabel: "Media",
      position: { x: 1240, y: 380 },
    },
    {
      id: "push",
      kind: "external",
      label: "FCM / APNS",
      sublabel: "Push",
      position: { x: 1240, y: 520 },
    },
  ],
  edges: [
    { id: "c1", sourceId: "client", targetId: "auth", label: "login" },
    { id: "c2", sourceId: "client", targetId: "lb", animated: true },
    { id: "c3", sourceId: "lb", targetId: "ws1", animated: true },
    { id: "c4", sourceId: "lb", targetId: "ws2", animated: true },
    { id: "c5", sourceId: "ws1", targetId: "presence", animated: true },
    { id: "c6", sourceId: "ws2", targetId: "presence", animated: true },
    { id: "c7", sourceId: "ws1", targetId: "msg" },
    { id: "c8", sourceId: "ws2", targetId: "msg" },
    { id: "c9", sourceId: "msg", targetId: "db" },
    { id: "c10", sourceId: "msg", targetId: "media" },
    { id: "c11", sourceId: "media", targetId: "s3" },
    { id: "c12", sourceId: "msg", targetId: "push", animated: true },
  ],
};

const videoStreaming: Architecture = {
  title: "Video streaming pipeline",
  nodes: [
    {
      id: "viewer",
      kind: "client",
      label: "Viewers",
      sublabel: "Web / TV / Mobile",
      position: { x: 40, y: 280 },
    },
    {
      id: "edge",
      kind: "cdn",
      label: "Edge CDN",
      sublabel: "HLS/DASH",
      position: { x: 280, y: 280 },
    },
    {
      id: "origin",
      kind: "service",
      label: "Origin Server",
      position: { x: 520, y: 280 },
    },
    {
      id: "transcode",
      kind: "service",
      label: "Transcoder",
      sublabel: "FFmpeg cluster",
      position: { x: 760, y: 180 },
    },
    {
      id: "storage",
      kind: "storage",
      label: "Object Storage",
      sublabel: "Segments",
      position: { x: 760, y: 380 },
    },
    {
      id: "ingest",
      kind: "service",
      label: "Ingest",
      sublabel: "RTMP/SRT",
      position: { x: 1000, y: 180 },
    },
    {
      id: "creator",
      kind: "client",
      label: "Creators",
      position: { x: 1240, y: 180 },
    },
    {
      id: "meta",
      kind: "database",
      label: "Postgres",
      sublabel: "Metadata",
      position: { x: 520, y: 460 },
    },
    {
      id: "analytics",
      kind: "queue",
      label: "Kafka",
      sublabel: "Play events",
      position: { x: 280, y: 460 },
    },
  ],
  edges: [
    { id: "v1", sourceId: "viewer", targetId: "edge", animated: true },
    { id: "v2", sourceId: "edge", targetId: "origin" },
    { id: "v3", sourceId: "origin", targetId: "storage" },
    { id: "v4", sourceId: "transcode", targetId: "storage" },
    { id: "v5", sourceId: "ingest", targetId: "transcode", animated: true },
    { id: "v6", sourceId: "creator", targetId: "ingest", animated: true },
    { id: "v7", sourceId: "origin", targetId: "meta" },
    { id: "v8", sourceId: "viewer", targetId: "analytics", animated: true },
  ],
};

const aiPipeline: Architecture = {
  title: "AI inference platform",
  nodes: [
    {
      id: "client",
      kind: "client",
      label: "Client App",
      position: { x: 40, y: 280 },
    },
    {
      id: "gw",
      kind: "gateway",
      label: "API Gateway",
      position: { x: 280, y: 280 },
    },
    { id: "auth", kind: "auth", label: "Auth", position: { x: 280, y: 120 } },
    {
      id: "router",
      kind: "service",
      label: "Model Router",
      position: { x: 520, y: 280 },
    },
    {
      id: "queue",
      kind: "queue",
      label: "Job Queue",
      sublabel: "Redis",
      position: { x: 760, y: 380 },
    },
    {
      id: "llm",
      kind: "ai",
      label: "LLM Inference",
      sublabel: "GPU pool",
      position: { x: 760, y: 180 },
    },
    {
      id: "embed",
      kind: "ai",
      label: "Embeddings",
      position: { x: 1000, y: 180 },
    },
    {
      id: "vector",
      kind: "database",
      label: "Vector DB",
      sublabel: "pgvector",
      position: { x: 1240, y: 180 },
    },
    {
      id: "log",
      kind: "storage",
      label: "Log Storage",
      sublabel: "S3",
      position: { x: 1000, y: 380 },
    },
  ],
  edges: [
    { id: "a1", sourceId: "client", targetId: "gw", animated: true },
    { id: "a2", sourceId: "gw", targetId: "auth" },
    { id: "a3", sourceId: "gw", targetId: "router" },
    { id: "a4", sourceId: "router", targetId: "llm", animated: true },
    { id: "a5", sourceId: "router", targetId: "queue" },
    { id: "a6", sourceId: "llm", targetId: "embed" },
    { id: "a7", sourceId: "embed", targetId: "vector" },
    { id: "a8", sourceId: "router", targetId: "log" },
  ],
};

const genericWebApp: Architecture = {
  title: "Generic web application",
  nodes: [
    {
      id: "user",
      kind: "client",
      label: "Web Client",
      sublabel: "React SPA",
      position: { x: 40, y: 240 },
    },
    { id: "cdn", kind: "cdn", label: "CDN", position: { x: 260, y: 100 } },
    {
      id: "gw",
      kind: "gateway",
      label: "API Gateway",
      position: { x: 260, y: 280 },
    },
    {
      id: "auth",
      kind: "auth",
      label: "Auth Service",
      position: { x: 500, y: 120 },
    },
    {
      id: "api",
      kind: "service",
      label: "Application API",
      position: { x: 500, y: 280 },
    },
    {
      id: "worker",
      kind: "service",
      label: "Background Worker",
      position: { x: 500, y: 440 },
    },
    {
      id: "db",
      kind: "database",
      label: "Postgres",
      position: { x: 760, y: 280 },
    },
    {
      id: "cache",
      kind: "cache",
      label: "Redis",
      position: { x: 760, y: 120 },
    },
    {
      id: "queue",
      kind: "queue",
      label: "Job Queue",
      position: { x: 760, y: 440 },
    },
    {
      id: "s3",
      kind: "storage",
      label: "Object Storage",
      position: { x: 1000, y: 280 },
    },
  ],
  edges: [
    { id: "g1", sourceId: "user", targetId: "cdn", animated: true },
    { id: "g2", sourceId: "user", targetId: "gw", animated: true },
    { id: "g3", sourceId: "gw", targetId: "auth" },
    { id: "g4", sourceId: "gw", targetId: "api" },
    { id: "g5", sourceId: "api", targetId: "db" },
    { id: "g6", sourceId: "api", targetId: "cache" },
    { id: "g7", sourceId: "api", targetId: "queue" },
    { id: "g8", sourceId: "queue", targetId: "worker", animated: true },
    { id: "g9", sourceId: "worker", targetId: "db" },
    { id: "g10", sourceId: "api", targetId: "s3" },
  ],
};

export function pickArchitecture(prompt: string): Architecture {
  const p = prompt.toLowerCase();
  if (/(chat|message|messaging|realtime|real-time|slack|whatsapp)/.test(p))
    return realtimeChat;
  if (/(shop|ecom|e-commerce|ecommerce|store|cart|checkout|payment)/.test(p))
    return ecommerce;
  if (/(video|stream|livestream|netflix|youtube|hls)/.test(p))
    return videoStreaming;
  if (/(ai|llm|inference|model|embedding|rag|vector)/.test(p))
    return aiPipeline;
  return genericWebApp;
}

export const COMPONENT_CATALOG: {
  category: string;
  items: { kind: ArchNodeKind; label: string; sublabel?: string }[];
}[] = [
  {
    category: "Compute",
    items: [
      { kind: "service", label: "Microservice" },
      { kind: "service", label: "Worker", sublabel: "Background job" },
      { kind: "ai", label: "GPU Inference", sublabel: "Model server" },
    ],
  },
  {
    category: "Storage",
    items: [
      { kind: "database", label: "Postgres" },
      { kind: "database", label: "MongoDB" },
      { kind: "storage", label: "Object Storage", sublabel: "S3" },
      { kind: "cache", label: "Redis" },
    ],
  },
  {
    category: "Networking",
    items: [
      { kind: "gateway", label: "API Gateway" },
      { kind: "gateway", label: "Load Balancer" },
      { kind: "cdn", label: "CDN" },
    ],
  },
  {
    category: "Messaging",
    items: [
      { kind: "queue", label: "Kafka" },
      { kind: "queue", label: "RabbitMQ" },
      { kind: "queue", label: "SQS" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { kind: "ai", label: "LLM" },
      { kind: "ai", label: "Embeddings" },
      { kind: "database", label: "Vector DB", sublabel: "pgvector" },
    ],
  },
  {
    category: "External",
    items: [
      { kind: "external", label: "Stripe" },
      { kind: "external", label: "Twilio" },
      { kind: "external", label: "SendGrid" },
      { kind: "auth", label: "OAuth Provider" },
    ],
  },
];
