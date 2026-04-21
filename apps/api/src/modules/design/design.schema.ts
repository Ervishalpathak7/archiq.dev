import z from "zod";

export const CreateDesignRequestSchema = z.object({
  title: z.string({ error: "Title is required" }),
  description: z.string().optional(),
  userPrompt: z.string({ error: "Prompt is required" }),
  techStack: z.string({ error: "Tech Stack is required" }),
  scale: z.enum(["small", "medium", "large"], { error: "scale is required" }),
  traffic: z.enum(["low", "moderate", "high"], {
    error: "traffic is required",
  }),
});

export type CreateDesignRequest = z.infer<typeof CreateDesignRequestSchema>;

export const UpdateDesignRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  techStack: z.string().optional(),
  scale: z.enum(["small", "medium", "large"]).optional(),
  traffic: z.enum(["low", "moderate", "high"]).optional(),
});

export type UpdateDesignRequest = z.infer<typeof UpdateDesignRequestSchema>;

export const ParamsSchema = z.object({
  id: z.string().min(1),
});
