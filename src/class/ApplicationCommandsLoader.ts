import { REST, Routes } from "discord.js";
import { EventEmitter } from 'events';
import { DJSError, errorkeys } from "../core/error";

interface LoaderEvents {
    'loaderStarted': [],
    'loaderFinished': [],
    'loaderRejected': []
};

export class ApplicationCommandsLoader extends EventEmitter {
    readonly clientToken: string = '';
    readonly clientId: string = '';
    readonly commands: object[] = [];
    readonly testGuildId: string | null = '';

    /**
     * Load application commands to Discord using `REST` and `Routes` from **discord.js**.
     * @param clientToken The application bot token.
     * @param clientId The application id.
     * @param commands The application commands.
     * @param testGuildId The guild ID to load the commands. Default: Global
     * @extends {EventEmitter}
     */

    constructor(clientToken: string, clientId: string, commands: object[], testGuildId?: string) {
        if (!clientToken) throw new DJSError(errorkeys.MissingParam);
        if (!clientId) throw new DJSError(errorkeys.MissingParam);
        if (!commands) throw new DJSError(errorkeys.MissingParam);

        if (typeof clientToken !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
        if (typeof clientId !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
        if (!Array.isArray(commands)) throw new DJSError(errorkeys.TypeError, 'object[]');

        if (testGuildId) {
            if (typeof testGuildId !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
        };

        super({
            captureRejections: true
        });

        this.clientToken = clientToken;
        this.clientId = clientId;
        this.commands = commands;
        this.testGuildId = testGuildId || null;
    };

    /**
     * Starts loading the application commands to the Discord app.
     * @returns {Promise<unknown>}
     */

    public async start() {
        return new Promise(async (resolved, rejected) => {
            try {
                this.emit('loaderStarted', this);

                const rest = new REST().setToken(this.clientToken);

                if (this.testGuildId && this.testGuildId?.length > 1) {
                    await rest.put(Routes.applicationGuildCommands(this.clientId, this.testGuildId), { body: this.commands });
                } else {
                   await rest.put(Routes.applicationCommands(this.clientId), { body: this.commands });
                };

                this.emit('loaderFinished', this);

                resolved(this);
            } catch (err) {
                this.emit('loaderRejected', this);

                rejected(err);
            };
        });
    };

    public on<K extends keyof LoaderEvents>(eventName: K, listener: (...args: LoaderEvents[K]) => void) { return this };
    public once<K extends keyof LoaderEvents>(eventName: K, listener: (...args: LoaderEvents[K]) => void) { return this };
};