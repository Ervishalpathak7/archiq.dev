import type { DesignSchema } from "@archiq/types";

export const JSONDesignSchema: DesignSchema = {
  title: "< title of the system >",
  components: [
    {
      id: "1",
      label: "< component name >",
      type: "< frontend | backend | database | cache | queue | gateway >",
    },
  ],
  connections: [
    {
      id: "a",
      source: "2",
      target: "1",
    },
  ],
  techStack: {
    backend: "< backend framework node | spring etc   >",
    frontend: "< frontend framework react | nextjs | vite etc >",
    database: "Database like Postgresql | MySql | MongoDB ",
  },
  scalingNotes: ["< Scalling options for each component >"],
  lldModules: [
    {
      name: "<Modulen name>",
      responsibilities: ["Responsibility of that module"],
    },
  ],
};

export const systemPrompt = `You are a senior software architect with 10+ years of experience designing secure, fast, scalable and efficient systems.
You must respond with ONLY valid JSON. No backticks, no explanation, no markdown. Just raw JSON.
Follow this exact schema:
${JSON.stringify(JSONDesignSchema, null, 2)}`;
