import ExtendedClient from './src/class/ExtendedClient';

// Create a new Client instance
const client = new ExtendedClient()

// Initialize the client and start the server
client.loadModules();
client.deploy();
client.start();