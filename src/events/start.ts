import { Events, Client } from "discord.js";
import { Event } from "../types"

export default {
    name: "ready",
    once: true,
    async execute(readyClient: Client<true>) {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    }
} satisfies Event