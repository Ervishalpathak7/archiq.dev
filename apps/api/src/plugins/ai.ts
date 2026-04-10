import fastifyPlugin from "fastify-plugin";
import { GoogleGenAI } from "@google/genai";
import config from "../config.js";

const aiPlugin = fastifyPlugin((fastify) => {
  const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY,
  });
  fastify.decorate("ai", ai);
});

export default aiPlugin;
