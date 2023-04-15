import {
    CommandInteraction,
    ComponentType,
    CollectorFilter,
    ButtonInteraction,
    InteractionCollector,
    EmbedBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    InteractionReplyOptions,
    ActionRowBuilder,
    ButtonStyle
} from 'discord.js';
import { DJSError, errorkeys } from '../error/index';

interface SendOptions {
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
    disableButtonsOnLastAndFirstPage?: boolean
};

interface PagesData {
    content?: string,
    embeds?: EmbedBuilder[],
    files?: AttachmentBuilder[]
};

export interface ButtonsBuilderData {
    id: string,
    label: string,
    emoji?: string | undefined,
    type: ButtonStyle
};

interface CustomOptions {
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number
};

export class ButtonsPaginatorBuilder {
    readonly data: this = this;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    buttons_data: ButtonsBuilderData[] = [];
    pages_data: PagesData[] = [];
    readonly custom_options: CustomOptions;
    readonly interaction: CommandInteraction;

    /**
     * Creates a Buttons paginator using `CommandInteraction#channel#createMessageComponentCollector()` from **discord.js**.
     * 
     * **THIS IS A PRE-RELEASE FEATURE**
     * @param interaction The interaction, extends from the class `CommandInteraction` from **discord.js**.
     * @param options Custom options. Default: `{ time: 60000 }`
     */

    constructor(interaction: CommandInteraction, options?: CustomOptions) {
        if (!interaction) throw new DJSError(errorkeys.MissingParam);

        this.interaction = interaction;

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter: options?.filter || undefined,
            time: options?.time || 60000
        });

        this.custom_options = options || {};
    };

    /**
     * Adds buttons to the components message.
     * 
     * Use the following IDs to make the buttons working:
     * ```txt
     * next: Next page.
     * previous: Back page.
     * home: Back to the home page.
     * deletereply: Deletes the reply.
     * disableall: Disables the buttons.
     * ```
     * 
     * **Note:** The difference between `addButtons` and `setButtons` that the first method (`addButtons`) adds multiple buttons (5 max) at same time to the buttons array, while the other (`setButtons`) overwrites the array to an empty array and sets new buttons.
     * @param data The data.
     * @returns {this}
     */

    public addButtons(...data: ButtonsBuilderData[]) {
        if (this.buttons_data.length > 5) throw new DJSError(errorkeys.LengthMaxReached, '5');

        data.forEach((æ) => {
            if (this.buttons_data.length > 5) throw new DJSError(errorkeys.LengthMaxReached, '5');

            this.buttons_data.push(æ);
        });

        return this;
    };

    /**
     * Set buttons to the components message.
     * 
     * Use the following IDs to make the buttons working:
     * ```txt
     * next: Next page.
     * previous: Back page.
     * home: Back to the home page.
     * deletereply: Deletes the reply.
     * disableall: Disables the buttons.
     * ```
     * 
     * **Note:** The difference between `addButtons` and `setButtons` that the first method (`addButtons`) adds multiple buttons (5 max) at same time to the buttons array, while the other (`setButtons`) overwrites the array to an empty array and sets new buttons.
     * @param data The data.
     * @returns {this}
     */

    public setButtons(...data: ButtonsBuilderData[]) {
        this.buttons_data = [];

        data.forEach((æ) => {
            if (this.buttons_data.length > 5) throw new DJSError(errorkeys.LengthMaxReached, '5');

            this.buttons_data.push(æ);
        });

        return this;
    };

    /**
     * Adds pages to the paginator.
     * 
     * **Note:** The difference between `addPages` and `setPages` that the first method (`addPages`) adds multiple pages at same time to the pages array, while the other (`setPages`) overwrites the array to an empty array and sets new pages.
     * @param data The data.
     * @returns {this}
     */

    public addPages(...data: PagesData[]) {
        data.forEach((æ) => {
            this.pages_data.push(æ);
        });

        return this;
    };

    /**
     * Set pages to the paginator.
     * 
     * **Note:** The difference between `addPages` and `setPages` that the first method (`addPages`) adds multiple pages at same time to the pages array, while the other (`setPages`) overwrites the array to an empty array and sets new pages.
     * @param data The data.
     * @returns {this}
     */

    public setPages(...data: PagesData[]) {
        this.pages_data = [];

        data.forEach((æ) => {
            this.pages_data.push(æ);
        });

        return this;
    };

    /**
     * Sends the message with the buttons.
     * @param options Custom options of sending the message.
     * @returns {Promise<unknown>}
     */

    public async send(options?: SendOptions) {
        return new Promise(async (resolved, rejected) => {
            try {
                let components = this.buttons_data.map((item) => {
                    return new ButtonBuilder()
                        .setLabel(item.label)
                        .setDisabled(false)
                        .setCustomId(item.id)
                        .setStyle(item.type)
                        .setEmoji(item.emoji || '')
                });

                const messageToSendData: InteractionReplyOptions = {
                    content: options?.home?.content ? options.home.content : this.pages_data[0].content || '** **',
                    embeds: options?.home?.embeds ? options.home.embeds.map((e) => e) : this.pages_data[0].embeds?.map((e) => e),
                    files: options?.home?.files ? options.home.files.map((f) => f) : this.pages_data[0].files?.map((f) => f),
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                components
                            )
                    ],
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true
                    },
                    ephemeral: options?.ephemeral || false
                };

                await this.interaction.reply(messageToSendData);

                let current = 0;

                this.collector?.on('collect', async (i) => {
                    if (i.customId === 'next') {
                        if (current === this.pages_data.length - 1) {
                            if (options?.disableButtonsOnLastAndFirstPage) {
                                const index = this.buttons_data.findIndex((btn) => btn.id === 'next');

                                if (index > -1) components[index].setDisabled(true);
                            } else current = 0;
                        } else {
                            current++;

                            if (options?.disableButtonsOnLastAndFirstPage) {
                                const index = this.buttons_data.findIndex((btn) => btn.id === 'next');

                                if (index > -1) components[index].setDisabled(false);
                            };
                        };

                        await i.update({
                            content: this.pages_data[current].content ? this.pages_data[current].content : '** **',
                            embeds: this.pages_data[current].embeds ? this.pages_data[current].embeds?.map((e) => e) : [],
                            files: this.pages_data[current].files ? this.pages_data[current].files?.map((f) => f) : [],
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        components
                                    )
                            ]
                        });

                        return;
                    };

                    if (i.customId === 'previous') {
                        if (current === 0) {
                            if (options?.disableButtonsOnLastAndFirstPage) {
                                const index = this.buttons_data.findIndex((btn) => btn.id === 'previous');

                                if (index > -1) components[index].setDisabled(true);
                            } else current = this.pages_data.length - 1;
                        } else {
                            current--;

                            if (options?.disableButtonsOnLastAndFirstPage) {
                                const index = this.buttons_data.findIndex((btn) => btn.id === 'previous');

                                if (index > -1) components[index].setDisabled(false);
                            };
                        };

                        await i.update({
                            content: this.pages_data[current].content ? this.pages_data[current].content : '** **',
                            embeds: this.pages_data[current].embeds ? this.pages_data[current].embeds?.map((e) => e) : [],
                            files: this.pages_data[current].files ? this.pages_data[current].files?.map((f) => f) : [],
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        components
                                    )
                            ]
                        });

                        return;
                    };

                    if (i.customId === 'home') {
                        await i.update({
                            content: options?.home?.content ? options.home.content : this.pages_data[0].content || '** **',
                            embeds: options?.home?.embeds ? options.home.embeds.map((e) => e) : this.pages_data[0].embeds?.map((e) => e),
                            files: options?.home?.files ? options.home.files.map((f) => f) : this.pages_data[0].files?.map((f) => f),
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        components
                                    )
                            ],
                        });

                        return;
                    };

                    if (i.customId === 'deletereply') {
                        await i.deleteReply();

                        return;
                    };

                    if (i.customId === 'disableall') {
                        await i.update({
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        components.map((btn) => btn.setDisabled(true))
                                    )
                            ]
                        })

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
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        this.buttons_data.map((item) => {
                                            return new ButtonBuilder()
                                                .setLabel(item.label)
                                                .setDisabled(false)
                                                .setCustomId(item.id)
                                                .setStyle(item.type)
                                                .setEmoji(item.emoji || '')
                                        })
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