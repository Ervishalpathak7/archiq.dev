/**
 * Pre-built mock system architectures.
 * Picked by keyword from the user's prompt to simulate AI generation.
 */

import { Architecture, ArchNodeType } from "@/types";

const ecommerce: Architecture = {
  title: "E-commerce platform",
  nodes: [
    {
      id: "web",
      position: { x: 40, y: 200 },
      data: {
        kind: "client",
        label: "Web App",
        sublabel: "Next.js",
      },
    },
    {
      id: "mobile",
      position: { x: 40, y: 360 },
      data: {
        kind: "client",
        label: "Mobile App",
        sublabel: "React Native",
      },
    },
    {
      id: "cdn",
      position: { x: 260, y: 80 },
      data: {
        kind: "cdn",
        label: "CDN",
        sublabel: "Cloudflare",
      },
    },
    {
      id: "gw",
      position: { x: 260, y: 280 },
      data: {
        kind: "gateway",
        label: "API Gateway",
        sublabel: "Kong",
      },
    },
    {
      id: "auth",
      position: { x: 500, y: 100 },
      data: {
        kind: "auth",
        label: "Auth Service",
        sublabel: "OAuth 2.0",
      },
    },
    {
      id: "catalog",
      position: { x: 500, y: 220 },
      data: {
        kind: "service",
        label: "Catalog Service",
      },
    },
    {
      id: "cart",
      position: { x: 500, y: 320 },
      data: {
        kind: "service",
        label: "Cart Service",
      },
    },
    {
      id: "orders",
      position: { x: 500, y: 420 },
      data: {
        kind: "service",
        label: "Orders Service",
      },
    },
    {
      id: "payments",
      position: { x: 760, y: 420 },
      data: {
        kind: "external",
        label: "Stripe",
        sublabel: "Payments",
      },
    },
    {
      id: "pgsql",
      position: { x: 760, y: 220 },
      data: {
        kind: "database",
        label: "Postgres",
        sublabel: "Primary DB",
      },
    },
    {
      id: "redis",
      position: { x: 760, y: 320 },
      data: {
        kind: "cache",
        label: "Redis",
        sublabel: "Cache",
      },
    },
    {
      id: "queue",
      position: { x: 760, y: 520 },
      data: {
        kind: "queue",
        label: "RabbitMQ",
        sublabel: "Order events",
      },
    },
    {
      id: "search",
      position: { x: 1000, y: 220 },
      data: {
        kind: "service",
        label: "Search",
        sublabel: "Elasticsearch",
      },
    },
  ],
  edges: [
    { id: "e1", source: "web", target: "cdn", animated: true },
    { id: "e2", source: "web", target: "gw", animated: true },
    { id: "e3", source: "mobile", target: "gw", animated: true },
    { id: "e4", source: "gw", target: "auth", label: "JWT" },
    { id: "e5", source: "gw", target: "catalog" },
    { id: "e6", source: "gw", target: "cart" },
    { id: "e7", source: "gw", target: "orders" },
    { id: "e8", source: "catalog", target: "pgsql" },
    { id: "e9", source: "cart", target: "redis" },
    { id: "e10", source: "orders", target: "pgsql" },
    { id: "e11", source: "orders", target: "payments", animated: true },
    { id: "e12", source: "orders", target: "queue", animated: true },
    { id: "e13", source: "catalog", target: "search" },
  ],
  id: ""
};

const realtimeChat: Architecture = {
  title: "Real-time chat backend",
  nodes: [
    {
      id: "client",
      position: { x: 40, y: 280 },
      data: {
        kind: "client",
        label: "Chat Clients",
        sublabel: "Web + Mobile",
      },
    },
    {
      id: "lb",
      position: { x: 280, y: 280 },
      data: {
        kind: "gateway",
        label: "Load Balancer",
        sublabel: "WebSocket",
      },
    },
    {
      id: "ws1",
      position: { x: 520, y: 180 },
      data: {
        kind: "service",
        label: "WS Gateway 1",
      },
    },
    {
      id: "ws2",
      position: { x: 520, y: 380 },
      data: {
        kind: "service",
        label: "WS Gateway 2",
      },
    },
    {
      id: "auth",
      position: { x: 280, y: 100 },
      data: {
        kind: "auth",
        label: "Auth",
        sublabel: "JWT",
      },
    },
    {
      id: "presence",
      position: { x: 760, y: 280 },
      data: {
        kind: "cache",
        label: "Redis Pub/Sub",
        sublabel: "Presence",
      },
    },
    {
      id: "msg",
      position: { x: 1000, y: 180 },
      data: {
        kind: "service",
        label: "Message Service",
      },
    },
    {
      id: "media",
      position: { x: 1000, y: 380 },
      data: {
        kind: "service",
        label: "Media Service",
      },
    },
    {
      id: "db",
      position: { x: 1240, y: 180 },
      data: {
        kind: "database",
        label: "Cassandra",
        sublabel: "Messages",
      },
    },
    {
      id: "s3",
      position: { x: 1240, y: 380 },
      data: {
        kind: "storage",
        label: "Object Storage",
        sublabel: "Media",
      },
    },
    {
      id: "push",
      position: { x: 1240, y: 520 },
      data: {
        kind: "external",
        label: "FCM / APNS",
        sublabel: "Push",
      },
    },
  ],
  edges: [
    { id: "c1", source: "client", target: "auth", label: "login" },
    { id: "c2", source: "client", target: "lb", animated: true },
    { id: "c3", source: "lb", target: "ws1", animated: true },
    { id: "c4", source: "lb", target: "ws2", animated: true },
    { id: "c5", source: "ws1", target: "presence", animated: true },
    { id: "c6", source: "ws2", target: "presence", animated: true },
    { id: "c7", source: "ws1", target: "msg" },
    { id: "c8", source: "ws2", target: "msg" },
    { id: "c9", source: "msg", target: "db" },
    { id: "c10", source: "msg", target: "media" },
    { id: "c11", source: "media", target: "s3" },
    { id: "c12", source: "msg", target: "push", animated: true },
  ],
  id: ""
};

const videoStreaming: Architecture = {
  title: "Video streaming pipeline",
  nodes: [
    {
      id: "viewer",
      position: { x: 40, y: 280 },
      data: {
        kind: "client",
        label: "Viewers",
        sublabel: "Web / TV / Mobile",
      },
    },
    {
      id: "edge",
      position: { x: 280, y: 280 },
      data: {
        kind: "cdn",
        label: "Edge CDN",
        sublabel: "HLS/DASH",
      },
    },
    {
      id: "origin",
      position: { x: 520, y: 280 },
      data: {
        kind: "service",
        label: "Origin Server",
      },
    },
    {
      id: "transcode",
      position: { x: 760, y: 180 },
      data: {
        kind: "service",
        label: "Transcoder",
        sublabel: "FFmpeg cluster",
      },
    },
    {
      id: "storage",
      position: { x: 760, y: 380 },
      data: {
        kind: "storage",
        label: "Object Storage",
        sublabel: "Segments",
      },
    },
    {
      id: "ingest",
      position: { x: 1000, y: 180 },
      data: {
        kind: "service",
        label: "Ingest",
        sublabel: "RTMP/SRT",
      },
    },
    {
      id: "creator",
      position: { x: 1240, y: 180 },
      data: {
        kind: "client",
        label: "Creators",
      },
    },
    {
      id: "meta",
      position: { x: 520, y: 460 },
      data: {
        kind: "database",
        label: "Postgres",
        sublabel: "Metadata",
      },
    },
    {
      id: "analytics",
      position: { x: 280, y: 460 },
      data: {
        kind: "queue",
        label: "Kafka",
        sublabel: "Play events",
      },
    },
  ],
  edges: [
    { id: "v1", source: "viewer", target: "edge", animated: true },
    { id: "v2", source: "edge", target: "origin" },
    { id: "v3", source: "origin", target: "storage" },
    { id: "v4", source: "transcode", target: "storage" },
    { id: "v5", source: "ingest", target: "transcode", animated: true },
    { id: "v6", source: "creator", target: "ingest", animated: true },
    { id: "v7", source: "origin", target: "meta" },
    { id: "v8", source: "viewer", target: "analytics", animated: true },
  ],
  id: ""
};

const aiPipeline: Architecture = {
  title: "AI inference platform",
  nodes: [
    {
      id: "client",
      position: { x: 40, y: 280 },
      data: {
        kind: "client",
        label: "Client App",
      },
    },
    {
      id: "gw",
      position: { x: 280, y: 280 },
      data: {
        kind: "gateway",
        label: "API Gateway",
      },
    },
    {
      id: "auth",
      position: { x: 280, y: 120 },
      data: {
        kind: "auth",
        label: "Auth",
      },
    },
    {
      id: "router",
      position: { x: 520, y: 280 },
      data: {
        kind: "service",
        label: "Model Router",
      },
    },
    {
      id: "queue",
      position: { x: 760, y: 380 },
      data: {
        kind: "queue",
        label: "Job Queue",
        sublabel: "Redis",
      },
    },
    {
      id: "llm",
      position: { x: 760, y: 180 },
      data: {
        kind: "ai",
        label: "LLM Inference",
        sublabel: "GPU pool",
      },
    },
    {
      id: "embed",
      position: { x: 1000, y: 180 },
      data: {
        kind: "ai",
        label: "Embeddings",
      },
    },
    {
      id: "vector",
      position: { x: 1240, y: 180 },
      data: {
        kind: "database",
        label: "Vector DB",
        sublabel: "pgvector",
      },
    },
    {
      id: "log",
      position: { x: 1000, y: 380 },
      data: {
        kind: "storage",
        label: "Log Storage",
        sublabel: "S3",
      },
    },
  ],
  edges: [
    { id: "a1", source: "client", target: "gw", animated: true },
    { id: "a2", source: "gw", target: "auth" },
    { id: "a3", source: "gw", target: "router" },
    { id: "a4", source: "router", target: "llm", animated: true },
    { id: "a5", source: "router", target: "queue" },
    { id: "a6", source: "llm", target: "embed" },
    { id: "a7", source: "embed", target: "vector" },
    { id: "a8", source: "router", target: "log" },
  ],
  id: ""
};

const genericWebApp: Architecture = {
  title: "Generic web application",
  nodes: [
    {
      id: "user",
      position: { x: 40, y: 240 },
      data: {
        kind: "client",
        label: "Web Client",
        sublabel: "React SPA",
      },
    },
    {
      id: "cdn",
      position: { x: 260, y: 100 },
      data: {
        kind: "cdn",
        label: "CDN",
      },
    },
    {
      id: "gw",
      position: { x: 260, y: 280 },
      data: {
        kind: "gateway",
        label: "API Gateway",
      },
    },
    {
      id: "auth",
      position: { x: 500, y: 120 },
      data: {
        kind: "auth",
        label: "Auth Service",
      },
    },
    {
      id: "api",
      position: { x: 500, y: 280 },
      data: {
        kind: "service",
        label: "Application API",
      },
    },
    {
      id: "worker",
      position: { x: 500, y: 440 },
      data: {
        kind: "service",
        label: "Background Worker",
      },
    },
    {
      id: "db",
      position: { x: 760, y: 280 },
      data: {
        kind: "database",
        label: "Postgres",
      },
    },
    {
      id: "cache",
      position: { x: 760, y: 120 },
      data: {
        kind: "cache",
        label: "Redis",
      },
    },
    {
      id: "queue",
      position: { x: 760, y: 440 },
      data: {
        kind: "queue",
        label: "Job Queue",
      },
    },
    {
      id: "s3",
      position: { x: 1000, y: 280 },
      data: {
        kind: "storage",
        label: "Object Storage",
      },
    },
  ],
  edges: [
    { id: "g1", source: "user", target: "cdn", animated: true },
    { id: "g2", source: "user", target: "gw", animated: true },
    { id: "g3", source: "gw", target: "auth" },
    { id: "g4", source: "gw", target: "api" },
    { id: "g5", source: "api", target: "db" },
    { id: "g6", source: "api", target: "cache" },
    { id: "g7", source: "api", target: "queue" },
    { id: "g8", source: "queue", target: "worker", animated: true },
    { id: "g9", source: "worker", target: "db" },
    { id: "g10", source: "api", target: "s3" },
  ],
  id: ""
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
  items: { kind: ArchNodeType; label: string; sublabel?: string }[];
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
