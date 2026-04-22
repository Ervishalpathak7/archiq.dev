import fastifyPlugin from "fastify-plugin";
import { Webhook } from "svix";
import config from "../config.js";
import { clerkClient, type WebhookEvent } from "@clerk/fastify";
import { createUser } from "../services/user.service.js";

const authWebhook = fastifyPlugin(async (fastify) => {
  fastify.post(
    "/auth/webhook/clerk",
    {
      config: { rawBody: true },
    },
    async (req, reply) => {
      const svix_id = req.headers["svix-id"] as string;
      const svix_timestamp = req.headers["svix-timestamp"] as string;
      const svix_signature = req.headers["svix-signature"] as string;

      if (!svix_id || !svix_timestamp || !svix_signature) {
        return reply.status(400).send({ error: "Missing svix headers" });
      }

      const wh = new Webhook(config.CLERK_SIGNING_SECRET);
      let event: WebhookEvent;

      try {
        event = wh.verify(req.rawBody as string, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        }) as WebhookEvent;
      } catch (error) {
        fastify.log.error(`Webhook verification failed: ${error}`);
        return reply.status(400).send({ error: "Invalid webhook signature" });
      }

      fastify.log.info(`Webhook received: ${event.type}`);

      switch (event.type) {
        case "user.created":
        case "user.updated": {
          const {
            id: clerkId,
            email_addresses,
            first_name,
            last_name,
            image_url,
          } = event.data;

          const primaryEmail = email_addresses?.find(
            (e) => e.id === event.data.primary_email_address_id,
          );
          const email = primaryEmail?.email_address ?? email_addresses?.[0]?.email_address;

          if (!email) {
            fastify.log.warn(`Webhook ${event.type}: No email found for ${clerkId}`);
            return reply.status(400).send({ error: "No email found" });
          }

          const name = `${first_name ?? ""} ${last_name ?? ""}`.trim() || "User";

          try {
            const user = await createUser(fastify.prisma, {
              email,
              name,
              clerkId,
              avatar: image_url ?? "",
            });

            fastify.log.info(
              `User ${event.type === "user.created" ? "created" : "updated"}: ${user.id} (${user.email})`,
            );

            // Sync the internal DB user ID back to Clerk's publicMetadata
            await clerkClient.users.updateUserMetadata(clerkId, {
              publicMetadata: {
                db_user_id: user.id,
              },
            });

            return reply.send({ received: true });
          } catch (error) {
            fastify.log.error(error, `Error processing ${event.type} webhook`);
            return reply
              .status(500)
              .send({ message: "Internal server error" });
          }
        }

        case "user.deleted": {
          const clerkId = event.data.id;
          if (!clerkId) {
            return reply.status(400).send({ error: "Missing user ID" });
          }

          try {
            // Cascade delete will remove the user's designs as well
            await fastify.prisma.user.delete({
              where: { clerkId },
            });
            fastify.log.info(`User deleted: ${clerkId}`);
            return reply.send({ received: true });
          } catch (error: any) {
            // User might not exist in our DB (e.g., webhook retry after manual cleanup)
            if (error?.code === "P2025") {
              fastify.log.warn(`User ${clerkId} not found in DB during delete webhook`);
              return reply.send({ received: true });
            }
            fastify.log.error(error, "Error processing user.deleted webhook");
            return reply
              .status(500)
              .send({ message: "Internal server error" });
          }
        }

        default: {
          fastify.log.info(`Unhandled webhook event: ${event.type}`);
          return reply.send({ received: true });
        }
      }
    },
  );
});

export default authWebhook;
