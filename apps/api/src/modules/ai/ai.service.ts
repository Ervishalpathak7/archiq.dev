import type Groq from "groq-sdk";

export class AiService {
  constructor(
    private aiClient: Groq,
    private systemPrompt: string,
  ) {}

  async generate(prompt: string) {
    return this.aiClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: prompt },
      ],
      stream: true,
    });
  }
}
