import { AttachmentBuilder, EmbedBuilder, CollectorFilter, StringSelectMenuInteraction } from "discord.js"

export interface DropdownPaginatorOptionsStructure {
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
}

export interface DropdownPaginatorConstructorOptions {
    placeHolder?: string,
    filter?: CollectorFilter<[StringSelectMenuInteraction]>,
    time?: number | undefined,
    customId?: string
}

export interface DropdownPaginatorSendOptions {
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
}