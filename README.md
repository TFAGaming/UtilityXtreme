<h1 align="center">
    UtilityXtreme
</h1>
<p align="center">
    <img src="https://nodei.co/npm/utilityxtreme.png?downloadRank=true&downloads=true&downloadRank=true&stars=true">
</p>

**UtilityXtreme** is a library that simplifies of creating your own Discord bot application.

- Easy to use & Beginner friendly.
- **99.9%** Promise based.
- Supportable with latest **discord.js** version (v14).
- Open-source project.
- Feature-rich.
- **100%** built with TypeScript.

## Requirements
- [**Node.js**](https://nodejs.org/en/download/) v16.9.0 or above.
- [**discord.js**](https://www.npmjs.com/package/discord.js) v14.9.0 or above.

> **Optional:**
> 1. Use TypeScript instead of JavaScript.
> 2. Use an IDE with a powerful Intellisense (ex: Visual Studio Code).

## Installation

```coffee
npm install utilityxtreme
yarn add utilityxtreme
```

## Documentation
[Click here](https://tfagaming.github.io/utilityxtreme/) to visit the documentation website.

## Preview
### 1. Discord bot

```ts
import {
    Client,
    SlashCommandBuilder,
    CommandInteraction
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

new FileBuilder(); // Creates a text file for Discord using Buffer.

new BoostDetector(); // Detects whenever a guild member has boost a server.

new Calculator(); // Creates a pre-ready and simple calculator.
```

### 3. Paginators

Buttons paginator:
```ts
import {
    ButtonStyle,
    EmbedBuilder
} from 'discord.js';
import {
    ButtonsPaginatorBuilder
} from 'utilityxtreme';

const pag = new ButtonsPaginatorBuilder(interaction)
    .addButtons(
        { label: 'Back', id: 'previous', type: ButtonStyle.Primary },
        { label: 'Delete', id: 'deletereply', type: ButtonStyle.Danger },
        { label: 'Next', id: 'next', type: ButtonStyle.Primary }
    )
    .addPages(
        { content: 'Page n° 1' },
        { embeds: [ new EmbedBuilder().setDescription('Page n° 2') ] },
        { content: 'Page n° 3', embeds: [ new EmbedBuilder().setDescription('Page n° 3') ] },
        { content: 'Page n° 4' },
    );

pag.send({
    disableButtonsOnLastAndFirstPage: true
});
```

<img src="https://media.discordapp.net/attachments/1053957993919684623/1097576504784867480/2023-04-17_18_32_57-7_Discord___general___DiscordJS-Guide-modified.png">

Dropdown menu paginator:
```ts
import {
    StringSelectMenuPaginatorBuilder
} from 'utilityxtreme';

const pag = new StringSelectMenuPaginatorBuilder(interaction, { placeHolder: 'Select a module...' })
    .addOptions(
        {
            message: { content: '/afk...' },
            component: { label: 'Utility commands' }
        },
        {
            message: { content: '/ban, /kick, /mute...' },
            component: { label: 'Moderation commands', description: 'Show all moderation commands!' }
        },
        {
            message: { content: '/info, /help...' },
            component: { label: 'Info commands' }
        },
    );

pag.send({
    home: {
        content: 'Help command! Click on the menu below.'
    }
});
```

<img src="https://media.discordapp.net/attachments/1053957993919684623/1097576504537387128/2023-04-17_18_34_22-7_Discord___general___DiscordJS-Guide-modified.png">

<img src="https://media.discordapp.net/attachments/1053957993919684623/1097576504243793940/2023-04-17_18_34_36-7_Discord___general___DiscordJS-Guide-modified.png">

### 4. Useful and cool functions

```ts
reverseString('Hello your computer has virus'); // => 'suriv sah retupmoc ruoy olleH'

censorString('aw hell nah', ['hell']); // => 'aw **** nah'

isDiscordInviteURL('Join my server! https://discord.gg/djs') // => true

isWebURL('welp nobody asked') // => false

await sleep(5000); // Sleeps for 5 seconds (in async function)

randomizedString(10, { includesInteger: false }); // => 'AgdvFokcLE'

idGen(); // => 94151456100486147

calculateString('(5*2)-9+2'); // => '3'
```

### 5. Simple JSON database

```ts
import {
    JSONDatabase
} from 'utilityxtreme';

const db = new JSONDatabase('./src/database.json'); // (Creates the database and load the methods)

db.set('name', 'T.F.A'); // => "name": "T.F.A",

db.set('age', 16); // => "age": 16,

db.keys(); // => ['name', 'age']

db.get('name'); // => 'T.F.A'

db.del('name'); // (Deletes the key)

db.get('name'); // => undefined

db.set('langs', ['JS', 'TS', 'Rust']);

db.push('langs', 'PY'); // => "langs": ["JS", "TS", "Rust", "PY"],

db.pull('langs', (item) => item !== 'Rust'); // => "langs": ["JS", "TS", "PY"],
```

## Developers
- [**T.F.A#7524**](https://www.github.com/TFAGaming): Head Developer (ツ)

## Support
<a href="https://discord.gg/E6VFACWu5V">
    <img src="https://invidget.switchblade.xyz/E6VFACWu5V">
</a>

## Other information

### Contributing:

If you have found an issue or a bug, please double-check the documentation and make sure that it hasn't been already reported/suggested.

- Create a new [Issue](https://github.com/TFAGaming/UtilityXtreme/issues) or [Pull Request](https://github.com/TFAGaming/UtilityXtreme/pulls).
- Help other members that are in-need on the [Discord server](https://discord.gg/E6VFACWu5V).

### License:
This project is under the license **GPL-3.0**.

### Development:
This package is not associated with the [**discord.js**](https://www.npmjs.com/package/discord.js) development team.
