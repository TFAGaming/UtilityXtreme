<h1 align="center">
    UtilityXtreme
</h1>
<p align="center">
    <img src="https://nodei.co/npm/utilityxtreme.png?downloadRank=true&downloads=true&downloadRank=true&stars=true">
</p>

**UtilityXtreme** is a library that simplifies of creating your own Discord bot application.

- Easy to use.
- **99.9%** Promise based.
- Supportable with latest **discord.js** version (v14).
- Feature-rich.
- **100%** built with TypeScript.

## Update v1.1.0
```diff
- The old versions has been deprecated.

+ Add typedoc to generate documentation website.
+ Fixed .npmignore to ingore the dir "test" and others.
```

## Requirements
- [**Node.js**]() v16.9.0 or above.
- [**discord.js**](https://www.npmjs.com/package/discord.js) v14.7.0 or above.

## Installation

```coffee
npm install utilityxtreme
yarn add utilityxtreme
```

## Examples
### 1. Discord bot

TypeScript example:
```js
import {
    Client,
    SlashCommandBuilder
} from 'discord.js';
import {
    ApplicationCommandsLoader
} from 'utilityxtreme';

const TOKEN = 'Your application bot token';
const ID = 'Your application ID';

const client = new Client({
    intents: ['Guilds']
});

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!')
        .toJSON()
];

const loader = new ApplicationCommandsLoader(TOKEN, ID, commands);

loader.on('loaderStarted', () => { console.log('[!] Started loading application commands...') });
loader.on('loaderFinished', () => { console.log('[!] Finished loading application commands.') });

loader.start();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });

        return;
    };
});

client.login(TOKEN);
```

If you want to use this example with JavaScript language, change the modules importing system by using the `require()` method.

```js
const {
    Client,
    SlashCommandBuilder
} = require('discord.js');
const {
    ApplicationCommandsLoader
} = require('utilityxtreme')
```

### 2. Discord simplified methods
```ts
createDiscordTimestamp(Date.now() + 5000, 'R'); // => "in 5 seconds"
```

### 3. String methods
```ts
reverseString('Hello your computer has virus'); // => 'suriv sah retupmoc ruoy olleH'

censorString('aw hell nah', ['hell']); // => 'aw **** nah'

isDiscordInviteURL('Join my server! https://discord.gg/djs') // => true

isWebURL('welp nobody asked') // => false
```

## Developers
- [**T.F.A#7524**](https://www.github.com/TFAGaming): Package creator ツ

### Note:
This package is not associated with the discord.js development team.
