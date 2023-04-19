import {
    ActionRowBuilder,
    AttachmentBuilder,
    CollectorFilter,
    CommandInteraction,
    ComponentType,
    EmbedBuilder,
    InteractionCollector,
    InteractionReplyOptions,
    MessageCreateOptions,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction
} from "discord.js";
import { DJSError, errorkeys } from "../core/error";

interface DropdownPaginatorSendOptions {
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
    channelSend?: boolean,
    editReply?: boolean,
    ephemeral?: boolean,
    mentionRepliedUser?: boolean,
    deleteMessageAfterTimeout?: boolean,
    replyWithEphemeralMessageOnCollect?: boolean
};

interface DropdownPaginatorOptionsStructure {
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

interface DropdownPaginatorConstructorOptions {
    placeHolder?: string,
    filter?: CollectorFilter<[StringSelectMenuInteraction]>,
    time?: number | undefined,
    customId?: string
};

export class StringSelectMenuPaginatorBuilder {
    readonly data: this = this;
    readonly collector: InteractionCollector<StringSelectMenuInteraction> | undefined;
    options_data: DropdownPaginatorOptionsStructure[] = [];
    readonly custom_options: DropdownPaginatorConstructorOptions;
    readonly interaction: CommandInteraction;

    constructor(interaction: CommandInteraction, customoptions?: DropdownPaginatorConstructorOptions) {
        if (!interaction) throw new DJSError(errorkeys.MissingParam);

        this.interaction = interaction;

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: customoptions?.filter || undefined,
            time: customoptions?.time || 60000
        });

        this.custom_options = customoptions || {};
    };

    public addOptions(...data: DropdownPaginatorOptionsStructure[]) {
        data.forEach((æ) => {
            this.options_data.push(æ);
        });

        return this;
    };

    public setOptions(...data: DropdownPaginatorOptionsStructure[]) {
        this.options_data = [];

        data.forEach((æ) => {
            this.options_data.push(æ);
        });

        return this;
    };

    public pushOption(data: DropdownPaginatorOptionsStructure) {
        this.options_data.push(data);

        return this;
    };

    public pullOption(index: number) {
        this.options_data.splice(index, 1);

        return this;
    };

    public async send(options?: DropdownPaginatorSendOptions) {
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

                const sendData: MessageCreateOptions = {
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
                    }
                };

                const replyData: InteractionReplyOptions = {
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

                if (options?.channelSend && !options.editReply) {
                    await this.interaction.channel?.send(sendData);
                } else if (options?.editReply && !options.channelSend) {
                    await this.interaction.editReply(replyData);
                } else await this.interaction.reply(replyData);

                this.collector?.on('collect', async (i) => {
                    const value = parseInt(i.values[0]);

                    if (i.user.id !== this.interaction.user.id) {
                        await i.reply({
                            content: 'You are not the author of this interaction.'
                        }).catch(() => { });

                        return;
                    };

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