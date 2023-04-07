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

## Examples
### 1. Discord bot (TypeScript)

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

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Pong!' });

        return;
    };
});

client.login(TOKEN);
```

### 2. Commands handler [BETA]
You can add your own custom options for the `Command` class (ex: Owner only, Cooldown... etc.).

```txt
Bot
 ├─── commands
 │       └─── Information
 │                  └─── ping.ts
 ├─── index.ts
 ├─── package.json
 └─── node_modules
```

`index.ts` file:
```ts
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

const handler = new Handler(client, './commands/', './commands/', { includesDir: true });

handler.on('fileLoaded', (f) => '[!] New command loaded: ' + f);
handler.on('fileUnloaded', (f) => '[!] Failed to load the command: ' + f);

handler.on('chatInputCreate', async (interaction, commandsMap) => {
    if (!commandsMap.get(interaction.commandName)) return;

    commandsMap.run(client, interaction, interaction.options);
});

const data = handler.loadFiles();

const loader = new ApplicationCommandsLoader(TOKEN, ID, handler.getCommands());

loader.on('loaderStarted', () => { console.log('[!] Started loading application commands...') });
loader.on('loaderFinished', () => { console.log('[!] Finished loading application commands.') });

loader.start();

client.login(TOKEN);
```

`ping.ts` file:
```ts
export default new Command({
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong')
        .toJSON(),
    run: async (client, interaction, args) => {
        await interaction.reply({ content: 'Pong!' });

        return;
    };
});
```

### 3. Discord simplified methods
```ts
createDiscordTimestamp(Date.now() + 5000, 'R'); // => "in 5 seconds"
```

### 4. String methods
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
