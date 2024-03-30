import ExtendedClient from './src/class/ExtendedClient';

// Create a new Client instance
const client = new ExtendedClient()

// Initialize the commands and events
client.loadModules();

// Deploy the bot (prepare it to launch)
client.deploy();

// Run the bot
client.start();