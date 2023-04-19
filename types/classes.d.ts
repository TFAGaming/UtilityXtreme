import {
    AttachmentBuilder,
    ButtonStyle,
    Client,
    CommandInteraction,
    EmbedBuilder
} from "discord.js";
import {
    BoostDetectorEvents,
    LoaderEvents
} from "./events";
import {
    ButtonsPaginatorButtonStructure,
    ButtonsPaginatorConstructorOptions,
    ButtonsPaginatorPageStructure,
    ButtonsPaginatorSendOptions,
    CalculatorSendOptions,
    CalculatorConstructorOptions,
    CalculatorMainMessageStructure,
    DropdownPaginatorConstructorOptions,
    DropdownPaginatorOptionsStructure,
    DropdownPaginatorSendOptions
} from './interfaces/index';

/**
 * ====================
 *  MAIN CLASSES
 * ====================
 */

export class ApplicationCommandsLoader {
    /**
     * Loads application commands against Discord API.
     * @param clientToken Your application bot token.
     * @param clientId Your application ID.
     * @param commands The application commands to load.
     * @param testGuildId The guild ID to load the commands in, not globally.
     */

    constructor(clientToken: string, clientId: string, commands: object[], testGuildId?: string);

    /**
     * Starts loading application commands.
     */

    public start(): Promise<unknown>;

    public on<K extends keyof LoaderEvents>(event: K, listener: (...args: LoaderEvents[K]) => void): this;
    public once<K extends keyof LoaderEvents>(event: K, listener: (...args: LoaderEvents[K]) => void): this;
}

export class BoostDetector {
    /**
     * Detects whenever a guild member has boosted or removed a boost from a server.
     * @param client The Discord bot client, instance of `Client` from discord.js.
     */

    constructor(client: Client);

    public on<K extends keyof BoostDetectorEvents>(event: K, listener: (...args: BoostDetectorEvents[K]) => void): this;
    public once<K extends keyof BoostDetectorEvents>(event: K, listener: (...args: BoostDetectorEvents[K]) => void): this;    
}

export class ButtonsPaginatorBuilder {
    /**
     * A simple and advanced paginator using buttons from the Discord API.
     * @param interaction The interaction, from the event `interactionCreate` from discord.js.
     * @param customoptions Custom options.
     */

    constructor(interaction: CommandInteraction, customoptions?: ButtonsPaginatorConstructorOptions);

    /**
     * Pushes multiple buttons to the buttons array.
     * 
     * Use the following blue colored IDs below to make the provided buttons working.
     * ```yaml
     * next: Next page.
     * previous: Previous page.
     * firstpage: Go to the first page.
     * lastpage: Go to the last page.
     * deletereply: Deletes the reply.
     * disableall: Disables the buttons.
     * ```
     * 
     * @param data The buttons structure data.
     */

    public addButtons(...data: ButtonsPaginatorButtonStructure[]): this;

    /**
     * Overwrites the buttons array into an empty array and pushes multiple buttons to the array.
     * 
     * Use the following blue colored IDs below to make the provided buttons working.
     * ```yaml
     * next: Next page.
     * previous: Previous page.
     * firstpage: Go to the first page.
     * lastpage: Go to the last page.
     * deletereply: Deletes the reply.
     * disableall: Disables the buttons.
     * ```
     * 
     * @param data The buttons structure data.
     */

    public setButtons(...data: ButtonsPaginatorButtonStructure[]): this;

    /**
     * Pushes multiple pages to the pages data.
     * @param data The pages structure data.
     */

    public addPages(...data: ButtonsPaginatorPageStructure[]): this;

    /**
     * Overwrites the pages array into an empty array and pushes multiple pages to the array.
     * @param data The pages structure data.
     */

    public setPages(...data: ButtonsPaginatorPageStructure[]): this;

    /**
     * Sends the paginator in the Discord app.
     * @param options Custom options.
     */

    public send(options?: ButtonsPaginatorSendOptions): Promise<unknown>;
}

export class Calculator {
    /**
     * Creates a simple and pre-ready calculator.
     * @param interaction The interaction, from the event `interactionCreate` from discord.js.
     * @param customoptions Custom options.
     */

    constructor(interaction: CommandInteraction, customoptions?: CalculatorConstructorOptions);

    /**
     * Overwrites the original content message.
     * @param data The message structure data.
     */

    public setMain(data: CalculatorMainMessageStructure): this;

    /**
     * Sends the calculator in the Discord app.
     * @param options Custom options.
     */

    public send(options?: CalculatorSendOptions): Promise<unknown>;
}

export class FileBuilder {
    /**
     * Creates a file for Discord app using **Buffer**.
     * @param content The content in the file.
     * @param name The file name.
     * @param description The file description.
     */

    constructor(content: string, name?: string, description?: string);
}

export class JSONDatabase {
    /**
     * Similar to `Map`, but the data is saved in a JSON file.
     * @param path The JSON file path.
     */

    constructor(path: string);

    /**
     * Overwrites the file with a new data.
     * @param data The data.
     */

    private write(data: string | object): this;

    /**
     * Reads the file.
     */

    private read(): object;

    /**
     * Define a new property in the data.
     * @param variable The property name.
     * @param value The property value.
     */

    public set(variable: string, value: string | number | [] | object): this;

    /**
     * Gets a specific property value.
     * @param variable The property name.
     */

    public get(variable: string): string | number | [] | object;

    /**
     * Deletes a property.
     * @param variable The property name.
     */

    public del(variable: string): this;

    /**
     * Pushes items in a property.
     * 
     * **Note:** If the property value is not an array, then the method will do nothing.
     * @param variable The property name.
     * @param value The value to push.
     */

    public push(variable: string, value: string | number | [] | object): this;

    /**
     * Pulls an items from a property, using by filter.
     * 
     * **Note:** If the property value is not an array, then the method will do nothing.
     * @param variable The property name.
     * @param filter The filter to pull an item.
     * 
     * @example
     * ```ts
     * // Remove a string or number:
     * 
     * db.pull('arr', (item) => item !== 'The item name');
     * 
     * db.pull('arr', (item) => item !== 69420);
     * 
     * // Remove an object:
     * 
     * db.pull('arr', (item) => item !== { name: 'what' });
     * ```
     */

    public pull(variable: string, filter: (item: any) => void): this;

    /**
     * Initialize the file, this means that the data will be overwrited to an empty object.
     */

    public init(): this;

    /**
     * Checks whenever the object includes a property.
     * @param variable The property name.
     */

    public has(variable: string): boolean;

    /**
     * Returns an array of saved properties.
     */

    public keys(): string[];

    /**
     * Total properties saved. You can use `this.keys().length` instead.
     */

    public length(): number;
}

export class StringSelectMenuPaginatorBuilder {
    /**
     * A simple and advanced paginator using dropdown menus from the Discord API.
     * @param interaction The interaction, from the event `interactionCreate` from discord.js.
     * @param customoptions Custom options.
     */

    constructor(interaction: Client, customoptions?: DropdownPaginatorConstructorOptions);

    /**
     * Pushes multiple options into the options array.
     * @param data The options structure data.
     */

    public addOptions(...data: DropdownPaginatorOptionsStructure[]): this;

    /**
     * Overwrites the options array into an empty array and pushes multiple options to the array.
     * @param data The options structure data.
     */

    public setOptions(...data: DropdownPaginatorOptionsStructure[]): this;

    /**
     * Pushes a single option into the options array.
     * @param data The options structure data.
     */

    public pushOption(data: DropdownPaginatorOptionsStructure): this;

    /**
     * Pulls an option by it's index.
     * @param index The option index.
     */

    public pullOption(index: number): this;

    /**
     * Sends the paginator in the Discord app.
     * @param options Custom options.
     */

    public send(options?: DropdownPaginatorSendOptions): Promise<unknown>;
}

/**
 * ====================
 *  HELPERS CLASSES
 * ====================
 */

export class ButtonsPaginatorButton {
    public setLabel(label: string): this;
    public setId(id: string): this;
    public setEmoji(emoji?: string): this;
    public setType(type: ButtonStyle): this;
}

export class ButtonsPaginatorPage {
    public setContent(content: string): this;

    public addEmbeds(...embeds: EmbedBuilder[]): this;
    public setEmbeds(...embeds: EmbedBuilder[]): this;

    public addFiles(...embeds: AttachmentBuilder[]): this;
    public setFiles(...files: AttachmentBuilder[]): this;
}

export class DropdownPaginatorOption {
    public setMessage(input: DropdownPaginatorOptionMessage | ((option: DropdownPaginatorOptionMessage) => DropdownPaginatorOptionMessage)): this;
    public setComponent(input: DropdownPaginatorOptionComponent | ((option: DropdownPaginatorOptionComponent) => DropdownPaginatorOptionComponent)): this;
}

export class DropdownPaginatorOptionMessage {
    public setContent(content: string): this;

    public addEmbeds(...embeds: EmbedBuilder[]): this;
    public setEmbeds(...embeds: EmbedBuilder[]): this;

    public addFiles(...embeds: AttachmentBuilder[]): this;
    public setFiles(...files: AttachmentBuilder[]): this;
}

export class DropdownPaginatorOptionComponent {
    public setLabel(label: string): this;
    public setDescription(description: string): this;
    public setEmoji(emoji?: string): this;
}