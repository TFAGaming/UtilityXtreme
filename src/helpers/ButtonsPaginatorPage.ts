import { EmbedBuilder, AttachmentBuilder } from "discord.js";

interface ButtonsPaginatorPageStructure {
    content?: string,
    embeds?: EmbedBuilder[],
    files?: AttachmentBuilder[]
};

export class ButtonsPaginatorPage {
    content: ButtonsPaginatorPageStructure['content'] = '** **';
    embeds: ButtonsPaginatorPageStructure['embeds'] = [];
    files: ButtonsPaginatorPageStructure['files'] = [];

    public setContent(content: string) {
        this.content = content;

        return this;
    };

    public addEmbeds(...embeds: EmbedBuilder[]) {
        embeds.forEach((e) => {
            this.embeds?.push(e);
        });

        return this;
    };

    public setEmbeds(...embeds: EmbedBuilder[]) {
        this.embeds = [];

        embeds.forEach((e) => {
            this.embeds?.push(e);
        });

        return this;
    };

    public addFiles(...files: AttachmentBuilder[]) {
        files.forEach((f) => {
            this.files?.push(f);
        });

        return this;
    };

    public setFiles(...files: AttachmentBuilder[]) {
        this.files = [];

        files.forEach((f) => {
            this.files?.push(f);
        });

        return this;
    };
};