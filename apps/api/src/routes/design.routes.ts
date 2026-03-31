import type { FastifyInstance } from "fastify";
import { db } from "@archiq/db";
import type { DesignRequest, DesignJSON } from "@archiq/types";
import { buildDesignPrompt } from "../lib/prompt.js";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env["GROQ_API_KEY"]! });

export const designRoutes = async (app: FastifyInstance) => {
  app.post<{ Body: DesignRequest }>(
    "/api/design/generate",
    async (request, reply) => {
      const body = request.body;

      // 1. Build the prompt
      const prompt = buildDesignPrompt(body);

      // 2. Call Groq
      const message = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      });

      // 3. Parse JSON
      const choice = message.choices[0];
      if (!choice) throw new Error("No response from AI");
      const rawText = choice.message?.content;
      if (!rawText) throw new Error("Empty response from AI");

      // 4. Parse JSON
      const cleaned = rawText
        .replace(/^```(?:json)?\n?/, "")
        .replace(/\n?```$/, "")
        .trim();

      const designJson: DesignJSON = JSON.parse(cleaned);

      console.log("DESIGN JSON: ", designJson);

      await db.user.upsert({
        where: { id: "temp-user-id" },
        update: {},
        create: {
          id: "temp-user-id",
          email: "temp@archiq.dev",
          name: "Temp User",
          password: "temp123",
        },
      });

      const design = await db.design.create({
        data: {
          title: designJson.title,
          designJson: designJson as object,
          userId: "temp-user-id",
        },
      });

      return reply.send({ success: true, design });
    },
  );
};
