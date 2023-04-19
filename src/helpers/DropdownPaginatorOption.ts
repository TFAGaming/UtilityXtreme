import { AttachmentBuilder, EmbedBuilder } from "discord.js"

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

export class DropdownPaginatorOption {
    message: DropdownPaginatorOptionsStructure['message'] = { };
    component: DropdownPaginatorOptionsStructure['component'] = { label: 'undefined option name' }; 

    public setMessage(input: DropdownPaginatorOptionMessage | ((option: DropdownPaginatorOptionMessage) => DropdownPaginatorOptionMessage)) {
        const res = typeof input === 'function' ? input(new DropdownPaginatorOptionMessage()) : input;

        this.message = res;

        return this;
    };

    public setComponent(input: DropdownPaginatorOptionComponent | ((option: DropdownPaginatorOptionComponent) => DropdownPaginatorOptionComponent)) {
        const res = typeof input === 'function' ? input(new DropdownPaginatorOptionComponent()) : input;

        this.component = res;

        return this;
    };
}

class DropdownPaginatorOptionMessage {
    content: DropdownPaginatorOptionsStructure['message']['content'];
    embeds: DropdownPaginatorOptionsStructure['message']['embeds'];
    files: DropdownPaginatorOptionsStructure['message']['files'];

    public setContent(content: string) {
        this.content = content;

        return this;
    };

    public addEmbeds(...data: EmbedBuilder[]) {
        data.forEach((e) => {
            this.embeds?.push(e);
        });

        return this;
    };

    public setEmbeds(...data: EmbedBuilder[]) {
        this.embeds = [];

        data.forEach((e) => {
            this.embeds?.push(e);
        });

        return this;
    };

    public addFiles(...data: AttachmentBuilder[]) {
        data.forEach((f) => {
            this.files?.push(f);
        });

        return this;
    };

    public setFiles(...data: AttachmentBuilder[]) {
        this.files = [];

        data.forEach((f) => {
            this.files?.push(f);
        });

        return this;
    };
};

class DropdownPaginatorOptionComponent {
    label: DropdownPaginatorOptionsStructure['component']['label'] = 'undefined option name';
    description: DropdownPaginatorOptionsStructure['component']['description'];
    emoji: DropdownPaginatorOptionsStructure['component']['emoji'];

    setLabel(label: string) {
        this.label = label;

        return this;
    };

    setDescription(description: string) {
        this.description = description;

        return this;
    };

    setEmoji(emoji?: string) {
        this.emoji = emoji;

        return this;
    };
};