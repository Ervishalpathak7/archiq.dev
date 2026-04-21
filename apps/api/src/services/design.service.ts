// import type Groq from "groq-sdk";
// import type { PrismaClient } from "../generated/prisma/client.js";
// import type { DesignOption } from "@archiq/types";

// async function generateDesignFromAi(
//   aiClient: Groq,
//   systemPrompt: string,
//   userPrompt: string,
//   onChunk: (chunk: string) => void,
// ) {
//   try {
//     const result = await aiClient.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userPrompt },
//       ],
//       stream: true,
//     });

//     let completeDesign = "";
//     for await (const chunk of result) {
//       const text = chunk.choices[0]?.delta?.content ?? "";
//       completeDesign += text;
//       onChunk(text);
//     }

//     const JsonDesign = JSON.parse(completeDesign);
//     return JsonDesign;
//   } catch (error) {
//     throw error;
//   }
// }

// export const createDesign = async (
//   userId: string,
//   { title, description, techStack, systemPrompt, userPrompt }: DesignOption,
//   ai: Groq,
//   onChunk: (text: string) => void,
//   prismaClient: PrismaClient,
// ) => {
//   try {
//     const aiDesign = await generateDesignFromAi(
//       ai,
//       systemPrompt,
//       userPrompt,
//       onChunk,
//     );

//     const design = await prismaClient.design.create({
//       data: {
//         title,
//         description,
//         body: aiDesign,
//         techStack: techStack,
//         authorId: userId,
//       },
//     });
//     console.log("New Design Created : ", {
//       id: design.id,
//       title: design.title,
//       description: design.description,
//       body: design.body,
//       author: design.authorId,
//     });
//   } catch (error) {
//     console.error("Error in Generating Design From Ai : ", error);
//   }
// };

// export const getDesignListService = async (
//   prisma: PrismaClient,
//   userId: string,
// ) => {
//   return await prisma.design.findMany({
//     where: {
//       authorId: userId,
//     },
//     select: {
//       id: true,
//       title: true,
//     },
//   });
// };

// export const getDesignDataById = async (
//   prisma: PrismaClient,
//   designId: string,
// ) => {
//   return await prisma.design.findUnique({
//     where: {
//       id: designId,
//     },
//   });
// };
