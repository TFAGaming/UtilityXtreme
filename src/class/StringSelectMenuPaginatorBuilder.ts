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
    ephemeral?: boolean,
    mentionRepliedUser?: boolean,
    deleteAfterTimeout?: boolean,
    replyWithEphemeralMessageOnCollect?: boolean,
    updateMessageOnCollect?: boolean,
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

interface CustomizeSelectMenuData {
    placeHolder: string
};

export class StringSelectMenuPaginatorBuilder {
    data: this = this;
    collector: InteractionCollector<StringSelectMenuInteraction> | undefined;
    options_data: OptionsData[] = [];
    selectcustom: CustomizeSelectMenuData;
    interaction: CommandInteraction;

    /**
     * Creates a Select menu/Dropdown menu paginator using `CommandInteraction#channel#createMessageComponentCollector()` from **discord.js**.
     * @param interaction The interaction, extends from the class `CommandInteraction` from **discord.js**.
     * @param collectorFilter The collector filter. If you want to set it to nothing, use an empty function: `() => { }`.
     * @param customizeSelectMenu Customize the select menu. Default: `{ placeHolder: 'Select something' }`
     */

    constructor(interaction: CommandInteraction, collectorFilter: CollectorFilter<[StringSelectMenuInteraction]>, customizeSelectMenu?: CustomizeSelectMenuData) {
        if (!interaction) throw new DJSError(errorkeys.MissingParam);

        if (!collectorFilter) throw new DJSError(errorkeys.MissingParam);

        if (typeof collectorFilter !== 'function') throw new DJSError(errorkeys.TypeError, 'function');

        this.interaction = interaction;

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: collectorFilter
        });

        this.selectcustom = customizeSelectMenu || { placeHolder: 'Select something' };
    };

    public addOptions(...data: OptionsData[]) {
        data.forEach((æ) => { // I dont know what to name this param, so I named it "æ"
            this.options_data.push(æ);
        });

        return this;
    };

    public async send(options?: SendOptionsData) {
        return new Promise(async (resolved, rejected) => {
            try {
                const menu = new StringSelectMenuBuilder()
                    .setCustomId('utilityxtreme-menu')
                    .setPlaceholder(this.selectcustom.placeHolder)
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

                this.interaction.replied ? await this.interaction.editReply(messageToSendData) : await this.interaction.reply(messageToSendData);

                this.collector?.on('collect', async (i) => {
                    const value = parseInt(i.values[0]);

                    if (options?.replyWithEphemeralMessageOnCollect) {
                        if (i.replied) return;

                        await i.reply({
                            content: this.options_data[value].message.content || '** **',
                            embeds: this.options_data[value].message.embeds?.map((e) => e) || [],
                            files: this.options_data[value].message.files?.map((f) => f) || [],
                            ephemeral: true
                        });
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
                    };

                    return;
                });

                this.collector?.on('end', async () => {
                    if (!this.collector?.ended) return;

                    if (options?.deleteAfterTimeout) {
                        await this.interaction.deleteReply();
                    } else {
                        await this.interaction.editReply({
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