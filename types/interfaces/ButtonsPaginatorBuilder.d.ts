import { ComponentEmojiResolvable, ButtonStyle, AttachmentBuilder, EmbedBuilder, CollectorFilter, ButtonInteraction } from "discord.js";

interface ButtonsPaginatorConstructorOptions {
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number | undefined
}

export interface ButtonsPaginatorButtonStructure {
    id: string,
    label: string,
    type: ButtonStyle,
    emoji?: ComponentEmojiResolvable,
}

export interface ButtonsPaginatorPageStructure {
    content?: string,
    embeds?: EmbedBuilder[],
    files?: AttachmentBuilder[]
}

export interface ButtonsPaginatorSendOptions {
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
}