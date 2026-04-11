import type { RedisClient } from "ioredis/built/connectors/SentinelConnector/types.js";
import type Groq from "groq-sdk";
import type { PrismaClient } from "../generated/prisma/client.js";

export const generateDesign = async (
  {
    userId,
    systemPrompt,
    userPrompt,
    title,
    description,
    techStack,
  }: {
    title: string;
    description: string;
    techStack: string;
    systemPrompt: string;
    userPrompt: string;
    userId: string;
  },
  ai: Groq,
  onChunk: (text: string) => void,
  prismaClient: PrismaClient,
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

    let completeDesign = "";
    for await (const chunk of result) {
      const text = chunk.choices[0]?.delta?.content ?? "";
      completeDesign += text;
      onChunk(text);
    }

    const JsonDesign = JSON.parse(completeDesign);
    const design = await prismaClient.design.create({
      data: {
        title,
        description,
        body: JsonDesign,
        techStack: techStack,
        authorId: userId,
      },
    });

    console.log(design);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log("Error in generating design : ", errorMessage);
    throw error;
  }
};
