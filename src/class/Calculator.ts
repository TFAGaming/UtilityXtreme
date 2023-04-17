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
    MessageCreateOptions,
    codeBlock,
} from "discord.js";
import { DJSError, errorkeys } from "../error/index";
import { calculateString } from "../func";

interface CustomOptions {
    filter?: CollectorFilter<[ButtonInteraction]>;
    time?: number | undefined;
}

interface SendOptions {
    channelSend?: boolean;
    editReply?: boolean;
    ephemeral?: boolean;
    mentionRepliedUser?: boolean;
    deleteMessageAfterTimeout?: boolean;
}

interface MainOptions {
    content?: string;
    embeds?: EmbedBuilder[];
    files?: AttachmentBuilder[];
}

export class Calculator {
    readonly data: this = this;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    main_options: MainOptions | undefined = undefined;
    readonly custom_options: CustomOptions;
    readonly interaction: CommandInteraction;

    /**
     * Creates a Buttons paginator using `CommandInteraction#channel#createMessageComponentCollector()` from **discord.js**.
     *
     * @param interaction The interaction, extends from the class `CommandInteraction` from **discord.js**.
     * @param options Custom options. Default: `{ time: 300000 }`
     */

    constructor(interaction: CommandInteraction, options?: CustomOptions) {
        if (!interaction) throw new DJSError(errorkeys.MissingParam);

        this.interaction = interaction;

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter: options?.filter || undefined,
            time: options?.time || 300000,
        });

        this.custom_options = options || {};
    }

    /**
     * Modify the message of the calculator.
     *
     * List of variables to use with string messages:
     *
     * ```nolang
     * %codeblock%: Shows the codeblock with the evaluation.
     * ```
     *
     * **Warn:** The variables above works only in the content property and in the embed description.
     *
     * @param options
     * @returns {this}
     */

    public setMain(options: MainOptions) {
        this.main_options = options;

        return this;
    }

    /**
     * Sends the calculator message.
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
                const components: ButtonBuilder[][] = [
                    [
                        new ButtonBuilder()
                            .setLabel("AC")
                            .setCustomId("ac")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel("Del")
                            .setCustomId("delete")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel("Exit")
                            .setCustomId("exit")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel("(")
                            .setCustomId("(")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel(")")
                            .setCustomId(")")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel("1")
                            .setCustomId("1")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("2")
                            .setCustomId("2")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("3")
                            .setCustomId("3")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("+")
                            .setCustomId("+")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel("/")
                            .setCustomId("/")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel("4")
                            .setCustomId("4")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("5")
                            .setCustomId("5")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("6")
                            .setCustomId("6")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("-")
                            .setCustomId("-")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel("%")
                            .setCustomId("%")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel("7")
                            .setCustomId("7")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("8")
                            .setCustomId("8")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("9")
                            .setCustomId("9")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("*")
                            .setCustomId("*")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel("~")
                            .setCustomId("NO_ID_1")
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel(".")
                            .setCustomId(".")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("0")
                            .setCustomId("0")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("00")
                            .setCustomId("00")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("=")
                            .setCustomId("=")
                            .setDisabled(false)
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setLabel("~")
                            .setCustomId("NO_ID_2")
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                    ],
                ];

                const actionrows: ActionRowBuilder<ButtonBuilder>[] = [
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[0].map((btn) => btn.setDisabled(false))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[1].map((btn) => btn.setDisabled(false))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[2].map((btn) => btn.setDisabled(false))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[3].map((btn) => btn.setDisabled(false))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[4].map((btn) => btn.setDisabled(false))
                    ),
                ];

                const actionrowsdis: ActionRowBuilder<ButtonBuilder>[] = [
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[0].map((btn) => btn.setDisabled(true))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[1].map((btn) => btn.setDisabled(true))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[2].map((btn) => btn.setDisabled(true))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[3].map((btn) => btn.setDisabled(true))
                    ),
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        components[4].map((btn) => btn.setDisabled(true))
                    ),
                ];

                let data = " ";

                const replyData: InteractionReplyOptions = {
                    content: this.main_options
                        ? this.main_options.content
                            ? this.main_options.content?.replace(
                                "%codeblock%",
                                codeBlock(data)
                            )
                            : "** **"
                        : `Evaluation: ${codeBlock(data)}`,
                    embeds: this.main_options && this.main_options.embeds
                        ? this.main_options.embeds?.map((e) => {
                            e.data?.description?.replace("%codeblock%", codeBlock(data));

                            return e;
                        })
                        : [],
                    files: this.main_options?.files?.map((f) => f) || [],
                    components: actionrows,
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true,
                    },
                    ephemeral: options?.ephemeral || false,
                };

                const sendData: MessageCreateOptions = {
                    content: this.main_options
                        ? this.main_options.content
                            ? this.main_options.content?.replace(
                                "%codeblock%",
                                codeBlock(data)
                            )
                            : "** **"
                        : `Evaluation: ${codeBlock(data)}`,
                    embeds: this.main_options && this.main_options.embeds
                        ? this.main_options.embeds?.map((e) => {
                            e.data?.description?.replace("%codeblock%", codeBlock(data));

                            return e;
                        })
                        : [],
                    files: this.main_options?.files?.map((f) => f) || [],
                    components: actionrows,
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true,
                    },
                };

                if (options?.channelSend && !options.editReply) {
                    await this.interaction.channel?.send(sendData);
                } else if (options?.editReply && !options.channelSend) {
                    await this.interaction.editReply(replyData);
                } else await this.interaction.reply(replyData);

                this.collector?.on("collect", async (i) => {
                    if (i.user.id !== this.interaction.user.id) {
                        await i
                            .reply({
                                content: "You are not the author of this interaction.",
                            })
                            .catch(() => { });

                        return;
                    }

                    if (i.customId === "=") {
                        let result: string;

                        try {
                            result = calculateString(data);
                        } catch (err) {
                            result = `Err 1`;
                        }

                        data = result;

                        await i.update({
                            content: this.main_options
                                ? this.main_options.content
                                    ? this.main_options.content?.replace(
                                        "%codeblock%",
                                        codeBlock(data)
                                    )
                                    : "** **"
                                : `Evaluation: ${codeBlock(data)}`,
                            embeds: this.main_options && this.main_options.embeds
                                ? this.main_options.embeds?.map((e) => {
                                    e.data?.description?.replace(
                                        "%codeblock%",
                                        codeBlock(data)
                                    );

                                    return e;
                                })
                                : [],
                            components: actionrows,
                        });

                        data = " ";
                    } else if (i.customId === "ac") {
                        data = " ";

                        await i.update({
                            content: this.main_options
                                ? this.main_options.content
                                    ? this.main_options.content?.replace(
                                        "%codeblock%",
                                        codeBlock(data)
                                    )
                                    : "** **"
                                : `Evaluation: ${codeBlock(data)}`,
                            embeds: this.main_options && this.main_options.embeds
                                ? this.main_options.embeds?.map((e) => {
                                    e.data?.description?.replace("%codeblock%", codeBlock(data));

                                    return e;
                                })
                                : [],
                            components: actionrows,
                        });
                    } else if (i.customId === "delete") {
                        data = data.slice(0, data.length - 1);

                        await i.update({
                            content: this.main_options
                                ? this.main_options.content
                                    ? this.main_options.content?.replace(
                                        "%codeblock%",
                                        codeBlock(data)
                                    )
                                    : "** **"
                                : `Evaluation: ${codeBlock(data)}`,
                            embeds: this.main_options && this.main_options.embeds
                                ? this.main_options.embeds?.map((e) => {
                                    e.data?.description?.replace("%codeblock%", codeBlock(data));

                                    return e;
                                })
                                : [],
                            components: actionrows,
                        });
                    } else if (i.customId === "exit") {
                        this.collector?.stop();
                    } else {
                        const id = i.customId;

                        if (id === "=" || id === "ac" || id === "exit" || id === "delete")
                            return;

                        data += id;

                        await i.update({
                            content: this.main_options
                                ? this.main_options.content
                                    ? this.main_options.content?.replace(
                                        "%codeblock%",
                                        codeBlock(data)
                                    )
                                    : "** **"
                                : `Evaluation: ${codeBlock(data)}`,
                            embeds: this.main_options && this.main_options.embeds
                                ? this.main_options.embeds?.map((e) => {
                                    e.data?.description?.replace("%codeblock%", codeBlock(data));

                                    return e;
                                })
                                : [],
                            files: this.main_options?.files?.map((f) => f) || []
                        });
                    }

                    return;
                });

                this.collector?.on("end", async () => {
                    if (!this.collector?.ended) return;

                    if (options?.deleteMessageAfterTimeout) {
                        await this.interaction.deleteReply();
                    } else {
                        await this.interaction.editReply({
                            content: this.main_options
                                ? this.main_options.content
                                    ? this.main_options.content?.replace(
                                        "%codeblock%",
                                        codeBlock(data)
                                    )
                                    : "** **"
                                : `Evaluation: ${codeBlock(data)}`,
                            embeds: this.main_options && this.main_options.embeds
                                ? this.main_options.embeds?.map((e) => {
                                    e.data?.description?.replace("%codeblock%", codeBlock(data));

                                    return e;
                                })
                                : [],
                            files: this.main_options?.files?.map((f) => f) || [],
                            components: actionrowsdis,
                        });
                    }

                    return;
                });

                resolved(this);
            } catch (err) {
                rejected(err);
            }
        });
    }
};