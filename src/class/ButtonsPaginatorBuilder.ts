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
import { DJSError, errorkeys } from '../core/error/index';

interface ButtonsPaginatorSendOptions {
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

interface ButtonsPaginatorPageStructure {
    content?: string,
    embeds?: EmbedBuilder[],
    files?: AttachmentBuilder[]
};

interface ButtonsPaginatorButtonStructure {
    id: string,
    label: string,
    emoji?: ComponentEmojiResolvable,
    type: ButtonStyle
};

interface ButtonsPaginatorConstructorOptions {
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number | undefined
};

export class ButtonsPaginatorBuilder {
    readonly data: this = this;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    buttons_data: ButtonsPaginatorButtonStructure[] = [];
    pages_data: ButtonsPaginatorPageStructure[] = [];
    readonly custom_options: ButtonsPaginatorConstructorOptions;
    readonly interaction: CommandInteraction;

    constructor(interaction: CommandInteraction, options?: ButtonsPaginatorConstructorOptions) {
        if (!interaction) throw new DJSError(errorkeys.MissingParam);

        this.interaction = interaction;

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter: options?.filter || undefined,
            time: options?.time || 60000
        });

        this.custom_options = options || {};
    };

    public addButtons(...data: ButtonsPaginatorButtonStructure[]) {
        if (this.buttons_data.length > 5) throw new DJSError(errorkeys.LengthMaxReached, '5');

        data.forEach((æ) => {
            if (this.buttons_data.length > 5) throw new DJSError(errorkeys.LengthMaxReached, '5');

            this.buttons_data.push(æ);
        });

        return this;
    };

    public setButtons(...data: ButtonsPaginatorButtonStructure[]) {
        this.buttons_data = [];

        data.forEach((æ) => {
            if (this.buttons_data.length > 5) throw new DJSError(errorkeys.LengthMaxReached, '5');

            this.buttons_data.push(æ);
        });

        return this;
    };

    public addPages(...data: ButtonsPaginatorPageStructure[]) {
        data.forEach((æ) => {
            this.pages_data.push(æ);
        });

        return this;
    };

    public setPages(...data: ButtonsPaginatorPageStructure[]) {
        this.pages_data = [];

        data.forEach((æ) => {
            this.pages_data.push(æ);
        });

        return this;
    };

    public async send(options?: ButtonsPaginatorSendOptions) {
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
                        await this.interaction.deleteReply();

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