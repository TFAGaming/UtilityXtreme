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

## Requirements
- [**Node.js**]() v16.9.0 or above.
- [**discord.js**](https://www.npmjs.com/package/discord.js) v14.7.0 or above.

## Installation

```coffee
npm install utilityxtreme
yarn add utilityxtreme
```

## Documentation
[Click here](https://tfagaming.github.io/utilityxtreme/) to visit the documentation website.

## Preview
### 1. Discord bot
This example below is written in TypeScript.

```js
import {
    Client,
    SlashCommandBuilder,
    CommandInteraction
} from 'discord.js';
import {
    ApplicationCommandsLoader
} from 'utilityxtreme';

const TOKEN: string = 'Your application bot token';
const ID: string = 'Your application ID';

const client = new Client({
    intents: ['Guilds']
});

const commands: SlashCommandBuilder[] = [
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

    if ((interaction as CommandInteraction).commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });

        return;
    };
});

client.login(TOKEN);
```

### 2. Discord simplified methods
```ts
createDiscordTimestamp(Date.now() + 5000, 'R'); // => "in 5 seconds"
```

### 3. Other cool methods
```ts
reverseString('Hello your computer has virus'); // => 'suriv sah retupmoc ruoy olleH'

censorString('aw hell nah', ['hell']); // => 'aw **** nah'

isDiscordInviteURL('Join my server! https://discord.gg/djs') // => true

isWebURL('welp nobody asked') // => false
```

## Developers
- [**T.F.A#7524**](https://www.github.com/TFAGaming): Package creator ツ

## Support
<a href="https://discord.gg/bGNRZcnwWy">
    <img src="https://invidget.switchblade.xyz/bGNRZcnwWy">
</a>

### Note:
This package is not associated with the discord.js development team.
