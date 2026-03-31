import type { DesignRequest } from "@archiq/types";
import { DESIGN_JSON_SCHEMA } from "@archiq/types";

export const buildDesignPrompt = (req: DesignRequest): string => `
You are an experienced software architect. Design a complete system architecture for the following project.

Project: ${req.projectDescription}

Features:
${req.features.map((f) => `- ${f.name}${f.description ? `: ${f.description}` : ""}`).join("\n")}

Scale: ${req.scale === "ai_choose" ? "Choose the most appropriate scale" : req.scale}
Architecture Style: ${req.architectureType === "ai_choose" ? "Choose the most appropriate architecture" : req.architectureType}

Tech Preferences:
${Object.entries(req.techPreferences)
  .map(([k, v]) => `- ${k}: ${v === "ai_choose" ? "choose best fit" : v}`)
  .join("\n")}

Respond with ONLY a raw JSON object matching this structure:
${JSON.stringify(DESIGN_JSON_SCHEMA, null, 2)}
`;
