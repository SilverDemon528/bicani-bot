import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { Command, Event } from "../types";
import { default as commandArray } from '../commands'
import { default as eventArray } from '../events'
import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";
import Database from "bun:sqlite";
import { loadDatabase } from "../utils/database_utils";



async function deployDebug(rest: REST, body: any) {
    await rest.put(
        Routes.applicationGuildCommands(Bun.env.CLIENT_ID ?? '', Bun.env.GUILD_ID ?? ''),
        { body: body }
    );
}

async function deployProduction(rest: REST, body: any) {
    console.log("Deploying bot...")
    await rest.put(
        Routes.applicationCommands(Bun.env.CLIENT_ID ?? ''),
        { body: body }
    );
}

export default class extends Client {
    public commands: Map<string, Command> = new Map()
    public audioPlayer: AudioPlayer = createAudioPlayer();
    public db: Database = loadDatabase()

    constructor(intents?: GatewayIntentBits[]) {
        super({
            intents: intents ?? [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent,
            ]
        });
        this.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try { await command.execute(this, interaction); }
            catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        });
    }

    public attachListener(event: Event) {
        if (event.once) {
            this.once(event.name, (...args) => event.execute(...args))
        } else {
            this.on(event.name, (...args) => event.execute(...args))
        }
    }

    public attachListeners(events: Event[]) {
        events.forEach(e => this.attachListener(e));
    }

    public registerCommand(command: Command) {
        this.commands.set(command.data.name, command);
    }

    public registerCommands(commands: Command[]) {
        commands.forEach(c => this.registerCommand(c));
    }

    public loadModules() {
        this.registerCommands(commandArray)
        this.attachListeners(eventArray)
    }

    public async deploy() {

        // Create the REST client for deploying commands.
        const rest = new REST().setToken(Bun.env.BOT_TOKEN ?? '');

        try {
            console.log('Started loading app commands...');
            let body = commandArray.flatMap(value => value.data.toJSON());

            if (Bun.env.NODE_ENV === "production") { deployProduction(rest, body); } else { deployDebug(rest, body); }

            console.log('Finished loading app commands...');
        } catch (e) { console.error(e); }
    }

    public async start() { await this.login(Bun.env.BOT_TOKEN); }
}