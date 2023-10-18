import { Awaitable, ChatInputCommandInteraction, ContextMenuCommandBuilder, SlashCommandBuilder } from "discord.js";
import ExtendedClient from "../class/ExtendedClient";

export interface Command {
    data: SlashCommandBuilder | ContextMenuCommandBuilder,
    execute: (client:ExtendedClient, interaction: ChatInputCommandInteraction) => Promise<void>
}

export interface Event {
    name: string,
    once: boolean,
    execute: (...args : any[]) => Awaitable<void>
}