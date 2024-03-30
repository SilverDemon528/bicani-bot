

# bicani-bot
## About
Bicani-Bot is a personalized Discord bot built on the Bun JS Runtime as a project to test its functionality. It is primarily on the discord.js framework, which is a JavaScript framework for interacting with the Discord bot api.


# Running the bot yourself
An important dependency for running the bot yourself is, of course, the BunJS runtime. The runtime is maily supported on Linux and MacOS, meaning direct Windows support isn't fully available (as of March 30th, 2024). However, BunJS does support WSL, which is highly-recommended for running it on Windows PCs.

The installation guide for BunJS can be found [on their website](https://bun.sh/).

## Setup
To install dependencies:

```bash
bun install
```

### Running the bot

To run:

```bash
bun start
```

To run with hot-reload:
```bash
bun dev
```

To deploy the bot for global use:
```bash
bun deploy
```

### Adding commands
The bot has some sample commands found in the ``/commands`` directory. The