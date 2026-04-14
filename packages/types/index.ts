export type DesignSchema = {
  title: string;
  components: { id: string; label: string; type: string }[];
  connections: { id: string; source: string; target: string; label?: string }[];
  lldModules: { name: string; responsibilities: string[] }[];
  techStack: {
    frontend?: string;
    backend?: string;
    database?: string;
    cache?: string;
    queue?: string;
  };
  scalingNotes: string[];
};

export type DesignOption = {
  title: string;
  description: string;
  techStack: string;
  systemPrompt: string;
  userPrompt: string;
};
