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
    ButtonStyle,
    ComponentEmojiResolvable,
    MessageCreateOptions
} from 'discord.js';
import { DJSError, errorkeys } from '../error/index';

interface SendOptions {
    onEnd?: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    channelSend?: boolean,
    editReply?: boolean,
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
    emoji?: ComponentEmojiResolvable,
    type: ButtonStyle
};

interface CustomOptions {
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number | undefined
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
     * Use the following button IDs to make them working: (All in lowercase)
     * ```yaml
     * next: Next page.
     * previous: Previous page.
     * firstpage: Go to the first page.
     * lastpage: Go to the last page.
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
     * Use the following button IDs to make them working: (All in lowercase)
     * ```yaml
     * next: Next page.
     * previous: Previous page.
     * firstpage: Go to the first page.
     * lastpage: Go to the last page.
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
     * 
     * By default, the interaction will be replied. To modify this, you can edit the reply or send the pagination to the interation channel without replying to the user in the options:
     * 
     * ```ts
     * {
     *     channelSend: true, // Interaction channel send.
     *     editReply: true // Interaction reply edit.
     * }
     * ```
     * 
     * @param options Custom options of sending the message.
     * @returns {Promise<unknown>}
     */

    public async send(options?: SendOptions) {
        return new Promise(async (resolved, rejected) => {
            try {
                let components = this.buttons_data.map((item) => {
                    if (options?.disableButtonsOnLastAndFirstPage && item.id === 'previous') {
                        return new ButtonBuilder()
                            .setLabel(item.label)
                            .setDisabled(true)
                            .setCustomId(item.id)
                            .setStyle(item.type)
                            .setEmoji(item.emoji || { name: undefined });
                    } else return new ButtonBuilder()
                        .setLabel(item.label)
                        .setDisabled(false)
                        .setCustomId(item.id)
                        .setStyle(item.type)
                        .setEmoji(item.emoji || { name: undefined });
                });

                const replyData: InteractionReplyOptions = {
                    content: this.pages_data[0].content || '** **',
                    embeds: this.pages_data[0].embeds?.map((e) => e),
                    files: this.pages_data[0].files?.map((f) => f),
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

                const sendData: MessageCreateOptions = {
                    content: this.pages_data[0].content || '** **',
                    embeds: this.pages_data[0].embeds?.map((e) => e),
                    files: this.pages_data[0].files?.map((f) => f),
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                components
                            )
                    ],
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true
                    }
                };

                if (options?.channelSend && !options.editReply) {
                    await this.interaction.channel?.send(sendData);
                } else if (options?.editReply && !options.channelSend) {
                    await this.interaction.editReply(replyData);
                } else await this.interaction.reply(replyData);

                let current = 0;

                const nextButton = (toggle: boolean) => {
                    const index = this.buttons_data.findIndex((btn) => btn.id === 'next');

                    if (index > -1) components[index].setDisabled(toggle);
                };

                const previousButton = (toggle: boolean) => {
                    const index = this.buttons_data.findIndex((btn) => btn.id === 'previous');

                    if (index > -1) components[index].setDisabled(toggle);
                };

                const bothEnable = () => {
                    nextButton(false);
                    previousButton(false);
                };

                this.collector?.on('collect', async (i) => {
                    if (i.user.id !== this.interaction.user.id) {
                        await i.reply({
                            content: 'You are not the author of this interaction.'
                        }).catch(() => { });

                        return;
                    };

                    if (i.customId === 'next') {
                        if (options?.disableButtonsOnLastAndFirstPage) {
                            if (current === this.pages_data.length - 1) {
                                nextButton(true);
                                previousButton(false);
                            } else {
                                current++;

                                if (current === this.pages_data.length - 1) {
                                    nextButton(true);
                                    previousButton(false);
                                };
                            };

                            if (current !== 0 && current !== this.pages_data.length - 1) bothEnable();
                        } else {
                            if (current === this.pages_data.length - 1) {
                                current = 0;
                            } else {
                                current++;
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
                        if (options?.disableButtonsOnLastAndFirstPage) {
                            if (current === 0) {
                                previousButton(true);
                                nextButton(false);
                            } else {
                                current--;

                                if (current === 0) {
                                    previousButton(true);
                                    nextButton(false);
                                };
                            };

                            if (current !== 0 && current !== this.pages_data.length - 1) bothEnable();
                        } else {
                            if (current === 0) {
                                current = this.pages_data.length - 1;
                            } else {
                                current--;
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

                    if (i.customId === 'firstpage') {
                        previousButton(true);
                        nextButton(false);

                        await i.update({
                            content: this.pages_data[0].content || '** **',
                            embeds: this.pages_data[0].embeds?.map((e) => e),
                            files: this.pages_data[0].files?.map((f) => f),
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        components
                                    )
                            ],
                        });

                        return;
                    };

                    if (i.customId === 'lastpage') {
                        previousButton(false);
                        nextButton(true);

                        const index = this.pages_data.length - 1;

                        await i.update({
                            content: this.pages_data[index].content || '** **',
                            embeds: this.pages_data[index].embeds?.map((e) => e),
                            files: this.pages_data[index].files?.map((f) => f),
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
                                                .setDisabled(true)
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