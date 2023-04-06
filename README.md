# UtilityXtreme

**UtilityXtreme** is a library that simplifies of creating your own Discord bot application.

- Easy to use.
- **99.9%** Promise based.
- Supportable with latest **discord.js** version (v14).
- Feature-rich.
- **100%** built with TypeScript.

## Update v1.0.0
```diff
+ Official release of the package on the npm registry.
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
Here is a Discord bot client example, you can try this one!

```js
import {
    Client,
    SlashCommandBuilder
} from 'discord.js';
import {
    ApplicationCommandsLoader
} from 'new-folder';

// Define your bot token & your bot id.
const TOKEN = 'Your application bot token';
const ID = 'Your application ID';

// Create a new client using the class Client.
const client = new Client({
    intents: ['Guilds']
});

// Define an array of slash commands, the outpout must be in JSON format.
const commands: SlashCommandBuilder[] = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!')
        .toJSON()
];

// Create a new application commands loader.
const loader = new ApplicationCommandsLoader(TOKEN, ID, commands).start();

loader.on('loaderStarted', () => { console.log('[!] Started loading application commands...') });
loader.on('loaderFinished', () => { console.log('[!] Finished loading application commands.') });

// Event from the client whenever an application command is used.
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });

        return;
    };
});

// Login & start to the client.
client.login(TOKEN);
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
This package is not associated with the discord.js team.
