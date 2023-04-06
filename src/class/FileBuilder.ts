import { AttachmentBuilder } from "discord.js";
import { DJSError, errorkeys } from "../error";

export class FileBuilder {
    /**
     * Creates a text file for Discord.
     * @param content The content for the file.
     * @param name The file name. Default: `'file.txt'`
     * @param description The file description. Default: `undefined`
     * @returns {AttachmentBuilder}
     */

    constructor(content: string, name?: string, description?: string) {
        if (!content) throw new DJSError(errorkeys.MissingParam);

        if (name) {
            if (typeof name !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
        };

        if (description) {
            if (typeof description !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
        };

        return new AttachmentBuilder(
            Buffer.from(content, 'utf-8'), { name: name || 'file.txt', description: description || undefined }
        );
    };
};