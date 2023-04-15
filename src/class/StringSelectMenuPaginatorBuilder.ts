import {
    ActionRowBuilder,
    AttachmentBuilder,
    CollectorFilter,
    CommandInteraction,
    ComponentType,
    EmbedBuilder,
    InteractionCollector,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction
} from "discord.js";
import { DJSError, errorkeys } from "../error";

interface SendOptionsData {
    home?: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    onEnd?: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    ephemeral?: boolean,
    mentionRepliedUser?: boolean,
    deleteMessageAfterTimeout?: boolean,
    replyWithEphemeralMessageOnCollect?: boolean
};

interface OptionsData {
    message: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    component: {
        label: string,
        description?: string,
        emoji?: string
    }
};

interface CustomOptions {
    placeHolder?: string,
    filter?: CollectorFilter<[StringSelectMenuInteraction]>,
    time?: number,
    customId?: string
};

export class StringSelectMenuPaginatorBuilder {
    readonly data: this = this;
    readonly collector: InteractionCollector<StringSelectMenuInteraction> | undefined;
    options_data: OptionsData[] = [];
    readonly custom_options: CustomOptions;
    readonly interaction: CommandInteraction;

    /**
     * Creates a Select menu/Dropdown menu paginator using `CommandInteraction#channel#createMessageComponentCollector()` from **discord.js**.
     * @param interaction The interaction, extends from the class `CommandInteraction` from **discord.js**.
     * @param options Custom options. Default: `{ time: 60000, placeHolder: 'Select here', customId: 'utilityxtreme-menu' }`
     */

    constructor(interaction: CommandInteraction, options?: CustomOptions) {
        if (!interaction) throw new DJSError(errorkeys.MissingParam);

        this.interaction = interaction;

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: options?.filter || undefined,
            time: options?.time || 60000
        });

        this.custom_options = options || {};
    };

    /**
     * Adds options to the Dropdown menu options array.
     * 
     * **Note:** The difference between `addOptions` and `setOptions` that the first method (`addOptions`) adds multiple options at same time to the options array, while the other (`setOptions`) overwrites the array to an empty array and sets new options.
     * @param data The data.
     * @returns {this}
     */

    public addOptions(...data: OptionsData[]) {
        data.forEach((æ) => {
            this.options_data.push(æ);
        });

        return this;
    };

    /**
     * Set options to the Dropdown menu options array.
     * 
     * **Note:** The difference between `addOptions` and `setOptions` that the first method (`addOptions`) adds multiple options at same time to the options array, while the other (`setOptions`) overwrites the array to an empty array and sets new options.
     * @param data The data.
     * @returns {this}
     */

    public setOptions(...data: OptionsData[]) {
        this.options_data = [];

        data.forEach((æ) => {
            this.options_data.push(æ);
        });

        return this;
    };

    /**
     * Push an option to the Dropdown menu options array.
     * @param data The data.
     * @returns {this}
     */

    public pushOption(data: OptionsData) {
        this.options_data.push(data);

        return this;
    };

    /**
     * Pull an option from the Dropdown menu options array by it's index.
     * @param index The index of the option.
     * @returns {this}
     */

    public pullOption(index: number) {
        this.options_data.splice(index, 1);

        return this;
    };

    /**
     * Sends the message with the dropdown menu.
     * @param options Custom options of sending the message.
     * @returns {Promise<unknown>}
     */

    public async send(options?: SendOptionsData) {
        return new Promise(async (resolved, rejected) => {
            try {
                const menu = new StringSelectMenuBuilder()
                    .setCustomId('utilityxtreme-menu' ?? this.custom_options.customId)
                    .setPlaceholder(this.custom_options.placeHolder ?? 'Select here')
                    .addOptions(
                        this.options_data.map((item, index) => {
                            return {
                                label: item.component.label,
                                value: `${index}`,
                                emoji: item.component.emoji || undefined,
                                description: item.component.description || undefined
                            }
                        })
                    );

                const messageToSendData: InteractionReplyOptions = {
                    content: options?.home?.content ? options.home.content : this.options_data[0].message.content,
                    embeds: options?.home?.embeds ? options.home.embeds.map((e) => e) : this.options_data[0].message.embeds?.map((e) => e),
                    files: options?.home?.files ? options.home.files.map((f) => f) : this.options_data[0].message.files?.map((f) => f),
                    components: [
                        new ActionRowBuilder<StringSelectMenuBuilder>()
                            .addComponents(
                                menu
                            )
                    ],
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true
                    },
                    ephemeral: options?.ephemeral || false
                };

                await this.interaction.reply(messageToSendData);

                this.collector?.on('collect', async (i) => {
                    const value = parseInt(i.values[0]);

                    if (options?.replyWithEphemeralMessageOnCollect) {
                        await i.reply({
                            content: this.options_data[value].message.content || '** **',
                            embeds: this.options_data[value].message.embeds?.map((e) => e) || [],
                            files: this.options_data[value].message.files?.map((f) => f) || [],
                            ephemeral: true
                        });

                        return;
                    } else {
                        await i.update({
                            content: this.options_data[value].message.content || '** **',
                            embeds: this.options_data[value].message.embeds?.map((e) => e) || [],
                            files: this.options_data[value].message.files?.map((f) => f) || [],
                            components: [
                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                    .addComponents(
                                        menu
                                    )
                            ]
                        });

                        return;
                    };
                });

                this.collector?.on('end', async () => {
                    if (!this.collector?.ended) return;

                    if (options?.deleteMessageAfterTimeout) {
                        await this.interaction.deleteReply();
                    } else {
                        await this.interaction.editReply({
                            content: options?.onEnd?.content ? options.onEnd.content : '** **',
                            embeds: options?.onEnd?.embeds ? options.onEnd.embeds.map((e) => e) : [],
                            files: options?.onEnd?.files ? options.onEnd.files.map((f) => f) : [],
                            components: [
                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                    .addComponents(
                                        menu.setDisabled(true)
                                    )
                            ]
                        });
                    };

                    return;
                });

                resolved(this);
            } catch (err) {
                rejected(err);
            };
        });
    };
};