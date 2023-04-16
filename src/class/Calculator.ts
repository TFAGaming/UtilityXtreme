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
    codeBlock
} from 'discord.js';
import { DJSError, errorkeys } from '../error/index';
import { calculateString } from '../func';

interface CustomOptions {
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number
};

interface SendOptions {
    channelSend?: boolean,
    editReply?: boolean,
    ephemeral?: boolean,
    mentionRepliedUser?: boolean,
    deleteMessageAfterTimeout?: boolean
};

interface MainOptions {
    content?: string,
    embeds?: EmbedBuilder[],
    files?: AttachmentBuilder[]
};

export class Calculator {
    readonly data: this = this;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    main_options: MainOptions = {
        embeds: [
            new EmbedBuilder()
                .setTitle('Calculator')
                .setDescription('Evaluation: %codeblock%')
                .setFooter({ text: '© 2023, UtilityXtreme.\n» npm i utilityxtreme@latest' })
                .setColor('Blurple')
        ]
    };
    readonly custom_options: CustomOptions;
    readonly interaction: CommandInteraction;

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
     * Modify the message of the calculator.
     * 
     * Here is the list of variables to use:
     * 
     * ```nolanguageherelel
     * %codeblock%: Shows the codeblock with the data.
     * ```
     * 
     * **Warn:** The variables above works only in the `content` and `embeds[i].data.description`.
     * 
     * @param options
     * 
     * @example
     * 
     * ```ts
     * {
     *     embeds: [
     *         new EmbedBuilder()
     *             .setTitle('Calculator!')
     *             .setDescription('%codeblock%')
     *     ]
     * }
     * ```
     * 
     * @returns {this}
     */

    public setMain(options: MainOptions) {
        this.main_options = options;

        return this;
    };

    /**
     * Sends the calculator message.
     * 
     * By default, the interaction will be replied. To modify this, you can edit the reply or send the pagination to the interation channel without replying to the user in the options:
     * 
     * ```ts
     * {
     *     channelSend: true, // If you want to send it in the interaction channel.
     *     editReply: true // If you want to edit the interaction reply.
     * }
     * ```
     * 
     * **Note:** If **editReply** property is `true` and the interaction is not replied yet, it will ignore this option and the interaction will be replied to avoid any kind of errors.
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
                            .setLabel('AC')
                            .setCustomId('ac')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel('Del')
                            .setCustomId('delete')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel('Exit')
                            .setCustomId('exit')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel('(')
                            .setCustomId('(')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel(')')
                            .setCustomId(')')
                            .setStyle(ButtonStyle.Primary)
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel('1')
                            .setCustomId('1')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('2')
                            .setCustomId('2')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('3')
                            .setCustomId('3')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('+')
                            .setCustomId('+')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel('/')
                            .setCustomId('/')
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel('4')
                            .setCustomId('4')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('5')
                            .setCustomId('5')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('6')
                            .setCustomId('6')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('-')
                            .setCustomId('-')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel('%')
                            .setCustomId('%')
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel('7')
                            .setCustomId('7')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('8')
                            .setCustomId('8')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('9')
                            .setCustomId('9')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('*')
                            .setCustomId('*')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel('~')
                            .setCustomId('NO_ID_1')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel('.')
                            .setCustomId('.')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('0')
                            .setCustomId('0')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('00')
                            .setCustomId('00')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('=')
                            .setCustomId('=')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setLabel('~')
                            .setCustomId('NO_ID_2')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary),
                    ]
                ];

                const actionrows: ActionRowBuilder<ButtonBuilder>[] = [
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[0]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[1]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[2]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[3]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[4]
                        )
                ];

                const actionrowsdis: ActionRowBuilder<ButtonBuilder>[] = [
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[0].map((btn) => btn.setDisabled(true))
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[1].map((btn) => btn.setDisabled(true))
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[2].map((btn) => btn.setDisabled(true))
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[3].map((btn) => btn.setDisabled(true))
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            components[4].map((btn) => btn.setDisabled(true))
                        )
                ];

                let data = '';

                const replyData: InteractionReplyOptions = {
                    content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                    embeds: this.main_options.embeds?.map((e) => {
                        e.data?.description?.replace('%codeblock%', codeBlock(data))

                        return e;
                    }) || [],
                    files: this.main_options.files?.map((f) => f) || [],
                    components: actionrows,
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true
                    },
                    ephemeral: options?.ephemeral || false
                };

                const sendData: MessageCreateOptions = {
                    content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                    embeds: this.main_options.embeds?.map((e) => {
                        e.data?.description?.replace('%codeblock%', codeBlock(data))

                        return e;
                    }) || [],
                    files: this.main_options.files?.map((f) => f) || [],
                    components: actionrows,
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true
                    }
                };

                if (options?.channelSend) {
                    await this.interaction.channel?.send(sendData);
                } else if (options?.editReply) {
                    this.interaction.replied ? await this.interaction.editReply(replyData) : await this.interaction.reply(replyData);
                } else await this.interaction.reply(replyData);

                this.collector?.on('collect', async (i) => {
                    if (i.user.id !== this.interaction.user.id) {
                        await i.reply({
                            content: 'You are not the author of this interaction.'
                        }).catch(() => { });

                        return;
                    };

                    if (i.customId === "=") {
                        let result: string;

                        try {
                            result = calculateString(data);
                        } catch (err) {
                            result = `Err 1`;
                        };

                        data = result;

                        await i.update({
                            content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                            embeds: this.main_options.embeds?.map((e) => {
                                e.data?.description?.replace('%codeblock%', codeBlock(data))

                                return e;
                            }) || []
                        });

                        data = '';
                    } else if (i.customId === "ac") {
                        data = '';

                        await i.update({
                            content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                            embeds: this.main_options.embeds?.map((e) => {
                                e.data?.description?.replace('%codeblock%', codeBlock(data))

                                return e;
                            }) || []
                        });
                    } else if (i.customId === "delete") {
                        data = data.slice(0, data.length - 1);

                        await i.update({
                            content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                            embeds: this.main_options.embeds?.map((e) => {
                                e.data?.description?.replace('%codeblock%', codeBlock(data))

                                return e;
                            }) || []
                        });
                    } else if (i.customId === "exit") {
                        await i.update({
                            content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                            embeds: this.main_options.embeds?.map((e) => {
                                e.data?.description?.replace('%codeblock%', codeBlock(data))

                                return e;
                            }) || [],
                            files: this.main_options.files?.map((f) => f) || [],
                            components: actionrowsdis
                        });
                    } else {
                        if (['=', 'ac', 'delete', 'exit'].some((item) => item === i.customId)) return;

                        data += i.customId;

                        await i.update({
                            content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                            embeds: this.main_options.embeds?.map((e) => {
                                e.data?.description?.replace('%codeblock%', codeBlock(data))

                                return e;
                            }) || []
                        });
                    };
                    
                    return;
                });

                this.collector?.on('end', async () => {
                    if (!this.collector?.ended) return;

                    if (options?.deleteMessageAfterTimeout) {
                        await this.interaction.deleteReply();
                    } else {
                        await this.interaction.editReply({
                            content: this.main_options.content?.replace('%codeblock%', codeBlock(data)) || '** **',
                            embeds: this.main_options.embeds?.map((e) => {
                                e.data?.description?.replace('%codeblock%', codeBlock(data))

                                return e;
                            }) || [],
                            files: this.main_options.files?.map((f) => f) || [],
                            components: actionrowsdis
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