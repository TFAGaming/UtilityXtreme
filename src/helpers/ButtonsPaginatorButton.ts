import { ButtonStyle, ComponentEmojiResolvable } from "discord.js";

interface ButtonsPaginatorButtonStructure {
    id: string,
    label: string,
    emoji?: ComponentEmojiResolvable,
    type: ButtonStyle
};

export class ButtonsPaginatorButton {
    label: ButtonsPaginatorButtonStructure['label'] = 'undefined button label';
    id: ButtonsPaginatorButtonStructure['id'] = 'undefined button id';
    emoji: ButtonsPaginatorButtonStructure['emoji'] = { name: undefined };
    type: ButtonsPaginatorButtonStructure['type'] = ButtonStyle.Primary;

    public setLabel(label: string) {
        this.label = label;

        return this;
    };

    public setId(id: string) {
        this.id = id;

        return this;
    };

    public setEmoji(emoji: string) {
        this.emoji = emoji;

        return this;
    };

    public setType(type: ButtonStyle) {
        this.type = type;

        return this;
    };
};