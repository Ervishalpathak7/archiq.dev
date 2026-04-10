import fastifyPlugin from "fastify-plugin";
import config from "../config.js";
import Groq from "groq-sdk";

const aiPlugin = fastifyPlugin((fastify) => {
  const ai = new Groq({
    apiKey: config.GROQ_API_KEY,
  });

  fastify.decorate("ai", ai);
});

export default aiPlugin;
