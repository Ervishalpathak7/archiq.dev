// import fastifyPlugin from "fastify-plugin";
// import { Webhook } from "svix";
// import config from "../config.js";
// import { clerkClient, type WebhookEvent } from "@clerk/fastify";
// import { createUser } from "../services/user.service.js";

// const authWebhook = fastifyPlugin(async (fastify) => {
//   fastify.post(
//     "/auth/webhook/clerk",
//     {
//       config: { rawBody: true },
//     },
//     async (req, reply) => {
//       const svix_id = req.headers["svix-id"] as string;
//       const svix_timestamp = req.headers["svix-timestamp"] as string;
//       const svix_signature = req.headers["svix-signature"] as string;

//       if (!svix_id || !svix_timestamp || !svix_signature)
//         return reply.status(400).send({ error: "Missing svix headers" });

//       const wh = new Webhook(config.CLERK_SIGNING_SECRET);
//       let event;

//       try {
//         event = wh.verify(req.rawBody as string, {
//           "svix-id": svix_id,
//           "svix-timestamp": svix_timestamp,
//           "svix-signature": svix_signature,
//         }) as WebhookEvent;
//       } catch (error) {
//         fastify.log.error(`Webhook verification failed: ${error}`);
//         return reply.status(400).send({ error: "Invalid webhook signature" });
//       }

//       if (event.type === "user.created" || event.type === "user.updated") {
//         const {
//           id: clerkId,
//           email_addresses,
//           first_name,
//           last_name,
//           image_url,
//         } = event.data;
//         const email = email_addresses?.[0]?.email_address;
//         if (!email) return reply.status(400).send({ error: "No email found" });
//         const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();

//         try {
//           const user = await createUser(fastify.prisma, {
//             email,
//             name,
//             clerkId,
//             avatar: image_url,
//           });

//           fastify.log.info(
//             `New user registerd : ${(user.id, user.name, user.email)}`,
//           );

//           await clerkClient.users.updateUserMetadata(clerkId, {
//             publicMetadata: {
//               db_user_id: user.id,
//             },
//           });

//           return reply.send({ received: true });
//         } catch (error) {
//           fastify.log.error(error, "Error in User saving ");
//           return reply.status(500).send({ message: "Backend Site Error" });
//         }
//       }
//     },
//   );
// });

// export default authWebhook;
