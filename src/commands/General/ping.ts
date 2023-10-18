import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import ExtendedClient from "../../class/ExtendedClient";


export default {
    data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('Test command'),
    async execute (client: ExtendedClient, interaction: ChatInputCommandInteraction) {
        await interaction.reply("Hello!");
    }
} satisfies Command