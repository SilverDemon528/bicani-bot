// import discord.js
import {Client, Events, GatewayIntentBits} from 'discord.js';
import ExtendedClient from './src/class/ExtendedClient';

import {default as commands} from "./src/commands"

// create a new Client instance

const client = new ExtendedClient()

client.loadModules()
client.deploy()
client.start()