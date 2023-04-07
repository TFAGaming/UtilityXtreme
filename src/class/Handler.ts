import { Client, SlashCommandBuilder, ContextMenuCommandBuilder, ContextMenuCommandInteraction, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';
import { EventEmitter } from 'events';
import { readdirSync } from 'fs';
import { DJSError, errorkeys } from "../error";

interface CommandOptions {
    data: SlashCommandBuilder | ContextMenuCommandBuilder,
    options?: object,
    run: (client: Client, interaction: CommandInteraction | ContextMenuCommandInteraction, args?: CommandInteractionOptionResolver) => any
};

export class Command {
    data: CommandOptions['data'];
    options?: CommandOptions['options'];
    run: CommandOptions['run'];

    /**
     * The class command made for the handler class `Handler`.
     * @param input The input of the command.
     * @returns {void}
     */

    constructor(input: CommandOptions) {
        this.data = input['data'];
        this.options = input['options'] || {};
        this.run = input['run'];

        return this;
    };
};

interface HandlerOptions {
    includesDir?: boolean
};

export class Handler extends EventEmitter {
    client: Client;
    fs_path: string = '';
    md_path: string = '';
    options: HandlerOptions = {};
    commands: Map<string, CommandOptions> = new Map<string, CommandOptions>();
    data_commands: object[] = [];

    /**
     * A simple handler to load modules such as commands and events.
     * @param client The Discord bot client, extends from the class `Client` from **discord.js**.
     * @param fs_path The FileSystem path dir starts from the main folder.
     * @param md_path The path dir starts from the Handler definition.
     * @param options Custom options. Default: `{}`
     */

    constructor(client: Client, fs_path: string, md_path: string, options?: HandlerOptions) {
        if (!client) throw new DJSError(errorkeys.MissingParam);
        if (!fs_path) throw new DJSError(errorkeys.MissingParam);
        if (!md_path) throw new DJSError(errorkeys.MissingParam);

        if (!(client instanceof Client)) throw new DJSError(errorkeys.TypeError, 'Client');
        if (typeof fs_path !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
        if (typeof md_path !== 'string') throw new DJSError(errorkeys.TypeError, 'string');

        if (options) {
            if (typeof options !== 'object') throw new DJSError(errorkeys.TypeError, 'object');
        };

        super({
            captureRejections: true
        });
    
        client.on('interactionCreate', async (interaction) => {
            const data = this.commands.get((interaction as CommandInteraction).commandName);

            if (!data) return;

            if (interaction.isChatInputCommand()) {
                this.emit('chatInputCreate', (interaction as CommandInteraction), this.commands);
            } else if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
                this.emit('contextMenuCreate', (interaction as ContextMenuCommandInteraction), this.commands);
            };
        });

        this.client = client;
        this.fs_path = fs_path;
        this.md_path = md_path;
        this.options = options || {};
    };

    public async loadFiles() {
        return new Promise(async (resolved, rejected) => {
            try {
                if (this.options?.includesDir) {
                    for (const directory of readdirSync(this.fs_path)) {
                        for (const file of readdirSync(this.fs_path + directory + '/').filter((f) => f.endsWith('.js'))) {
                            // This package has it's own handler, and the exportation of the modules must include the 'default' keyword.
                            const module: CommandOptions = require(this.md_path)['default'];

                            if (!module.data || typeof module.data !== 'object') {
                                this.emit('fileUnloaded', file, directory);

                                continue;
                            };

                            this.commands.set(module.data?.name, module);

                            this.data_commands.push(module.data);

                            this.emit('fileLoaded', file, directory);
                        };
                    };
                } else {
                    for (const file of readdirSync(this.fs_path + '/').filter((f) => f.endsWith('.js'))) {
                        // This package has it's own handler, and the exportation of the modules must include the 'default' keyword.
                        const module: CommandOptions = require(this.md_path)['default'];

                        if (!module.data || typeof module.data !== 'object') {
                            this.emit('fileUnloaded', file, null);

                            continue;
                        };

                        this.commands.set(module.data?.name, module);

                        this.data_commands.push(module.data);

                        this.emit('fileLoaded', file, null);
                    };
                };

                resolved(this);
            } catch (err) {
                rejected(err);
            };
        });
    };

    public getCommands() {
        return this.commands.keys();
    };
};