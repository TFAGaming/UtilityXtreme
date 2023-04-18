<h1 align="center">
    UtilityXtreme
</h1>
<p align="center">
    <img src="https://nodei.co/npm/utilityxtreme.png?downloadRank=true&downloads=true&downloadRank=true&stars=true">

<h3 align="center">
    The friendly package to start with your Discord bot application.
</h3>
</p>

**UtilityXtreme** is a library that simplifies of creating your own Discord bot application.

- Easy to use & Beginner friendly.
- **99.9%** Promise based.
- Supportable with latest **discord.js** version (v14).
- Open-source project.
- Feature-rich.
- **100%** written in TypeScript.

## Table of Contents
- [UtilityXtreme](#)
    - [Table of Contents](#table-of-contents)
    - [Requirements](#requirements)
        - [Optional](#optional)
    - [Installation](#installation)
    - [Documentation](#documentation)
    - [Modules preview](#modules-preview)
    - [Example Discord Bot](#example-discord-bot)
        - [TypeScript](#typescript)
        - [JavaScript (CommonJS)](#javascript-commonjs)
    - [Developers](#developers)
    - [Other Information](#other-information)
        - [License](#license)
        - [Development](#development)

## Requirements
- [**Node.js**](https://nodejs.org/en/download/) v16.9.0 or above.
- [**discord.js**](https://www.npmjs.com/package/discord.js) v14.9.0 or above.

### Optional:
- Use TypeScript instead of JavaScript for the typings.
- Use an IDE with a powerful Intellisense (example: Visual Studio code) for the typings.

## Installation

```coffee
npm install utilityxtreme
yarn add utilityxtreme
```

## Documentation
[Click here](https://tfagaming.github.io/utilityxtreme/) to visit the documentation website.

## Modules preview

- Modules
    - Classes
        - `ApplicationCommandsLoader`: Loads application commands to Discord.
        - `BoostDetector`: Detects whenever a guild member has boosted or has removed a boost from a guild.
        - `ButtonsPaginatorBuilder`: An advanced paginator using buttons.
        - `Calculator`: A simple and pre-ready calculator (**mathjs** not required).
        - `FileBuilder`: Creates a file for Discord, by using **Buffer**.
        - `JSONDatabase`: The methods are similar to **Map** but the data is saved in a JSON file.
        - `StringSelectMenuPaginatorBuilder`: An advanced paginator using dropdown/select menus.
    - Functions
        - `calculateString`: Calculates some simple math equations.
        - `censorString`: Replaces some characters in a string with '*' (changeable).
        - `createDiscordTimestamp`: Creates a Discord timestamp.
        - `hexColorGen`: Generates a random HEX color code.
        - `idGen`: Generates a random integer.
        - `isDiscordInviteURL`: Detects whenever a string includes a Discord invite URL.
        - `isWebURL`: Detects whenever a string includes any web URL.
        - `randomizedString`: Generates some random characters.
        - `reverseString`: Reverses a string.
        - **async** `sleep`: Sleeps for a specific time.

## Example Discord Bot
### TypeScript:
```ts
import { Client, SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { ApplicationCommandsLoader } from 'utilityxtreme';

const botToken = "Your bot token";
const botId = "Your bot id";

const client: Client = new Client({
    intents: ['Guilds']
});

const commands: SlashCommandBuilder[] = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .toJSON()
];

const loader: ApplicationCommandsLoader = new ApplicationCommandsLoader(botToken, botId, commands);

loader.on('loaderStarted', () => { console.log('Started loading application commands...') });
loader.on('loaderFinished', () => { console.log('Finished loading application commands.') });

loader.start().catch(console.error);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if ((interaction as CommandInteraction).commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });
    };
});

client.login(botToken);
```

### JavaScript: (CommonJS)

```js
const { Client, SlashCommandBuilder } = require('discord.js');
const { ApplicationCommandsLoader } = require('utilityxtreme');

const botToken = "Your bot token";
const botId = "Your bot id";

const client = new Client({
    intents: ['Guilds']
});

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .toJSON()
];

const loader = new ApplicationCommandsLoader(botToken, botId, commands);

loader.on('loaderStarted', () => { console.log('Started loading application commands...') });
loader.on('loaderFinished', () => { console.log('Finished loading application commands.') });

loader.start().catch(console.error);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });
    };
});

client.login(botToken);
```

## Developers
- [**T.F.A#7524**](https://www.github.com/TFAGaming): Head Developer (ツ)

## Support
Did you find a problem (or a bug), or want to share some new ideas? Join the Discord server below!

<a href="https://discord.gg/E6VFACWu5V">
    <img src="https://invidget.switchblade.xyz/E6VFACWu5V">
</a>

You can create an [Issue](https://github.com/TFAGaming/UtilityXtreme/issues) or a [Pull Request](https://github.com/TFAGaming/UtilityXtreme/pulls) instead on GitHub.

## Other information

### License:
This project is under the license **GPL-3.0**.

### Development:
This package is not associated with the [**discord.js**](https://www.npmjs.com/package/discord.js) development team.

[↑ Back to top](#)