import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserService } from "./user.service.js";
import { Webhook } from "svix";
import config from "../../config.js";
import { type ClerkClient, type WebhookEvent } from "@clerk/fastify";

export class UserControllers {
    constructor(private services: UserService, private clerkClient: ClerkClient) { }

    createWebhook = async (req: FastifyRequest, reply: FastifyReply) => {
        const svix_id = req.headers["svix-id"] as string;
        const svix_timestamp = req.headers["svix-timestamp"] as string;
        const svix_signature = req.headers["svix-signature"] as string;

        if (!svix_id || !svix_timestamp || !svix_signature)
            return reply.status(400).send({ error: "Missing svix headers" });

        const webhook = new Webhook(config.CLERK_SIGNING_SECRET)
        let event: WebhookEvent | null

        try {
            event = await webhook.verify(req.rawBody as string, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent

        } catch (error) {
            console.error(`Webhook verification failed: ${error}`);
            return reply.status(400).send({ error: "Invalid webhook signature" });
        }
        if (event.type === 'user.created') {
            const {
                email_addresses,
                first_name,
                last_name,
                image_url: avatar,
                id: clerkId
            } = event.data

            const email = email_addresses?.[0]?.email_address;
            if (!email) return reply.status(400).send({ error: "No email found" });
            const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();

            const user = await this.services.upsertUser(clerkId, { name, email, clerkId, avatar })
            console.log(`New User Upserted : ${user.name}`);
            await this.clerkClient.users.updateUserMetadata(clerkId, {
                publicMetadata: {
                    db_user_id: user.id,
                    plan: "free"
                }
            })
            reply.status(200).send({ recieved: true })
            return;
        } else {
            console.log(`Unconfigured Event Accoured : ${event.type}`);
            reply.status(400).send({ error: "Event not configured" })
        }
    }
}