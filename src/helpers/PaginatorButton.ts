import {
    ButtonStyle
} from "discord.js";
import { ButtonsBuilderData } from "../class/ButtonsPaginatorBuilder";
import { DJSError, errorkeys } from "../error";

export class PaginatorButton implements ButtonsBuilderData {
    label!: string;
    id!: string;
    emoji?: string | undefined;
    type!: ButtonStyle;

    /**
     * Simplified way to create buttons for the paginator `ButtonsPaginatorBuilder`.
     */

    constructor() { };

    public setId(buttonId: string) {
        if (this.type && this.type === 5) throw new DJSError(errorkeys.InputNotAllowed, [1, 2, 3, 4]);

        this.id = buttonId;

        return this;
    };

    public setLabel(label: string) {
        this.label = label;

        return this;
    };

    public setEmoji(emoji: string) {
        this.emoji = emoji;

        return this;
    };

    public setType(type: ButtonStyle | number) {
        this.type = type;

        return this;
    };
};