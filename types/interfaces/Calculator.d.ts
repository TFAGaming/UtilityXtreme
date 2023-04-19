import { EmbedBuilder, AttachmentBuilder, CollectorFilter, ButtonInteraction } from "discord.js";

export interface CalculatorMainMessageStructure {
    content?: string,
    embeds?: EmbedBuilder[],
    files?: AttachmentBuilder[]
}

export interface CalculatorConstructorOptions {
    filter?: CollectorFilter<[ButtonInteraction]>;
    time?: number | undefined;
}

export interface CalculatorSendOptions {
    channelSend?: boolean;
    editReply?: boolean;
    ephemeral?: boolean;
    mentionRepliedUser?: boolean;
    deleteMessageAfterTimeout?: boolean;
}