import type { RedisClient } from "ioredis/built/connectors/SentinelConnector/types.js";
import type { PrismaClient } from "../generated/prisma/internal/class.js";
import type Groq from "groq-sdk";

export const generateDesign = async (
  systemPrompt: string,
  userPrompt: string,
  ai: Groq,
  onChunk: (text: string) => void,
  prismaClient?: PrismaClient,
  redisClient?: RedisClient,
) => {
  try {
    const result = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      stream: true,
    });

    for await (const chunk of result) {
      const text = chunk.choices[0]?.delta?.content ?? "";
      onChunk(text);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log("Error in generating design : ", errorMessage);
    throw error;
  }
};
