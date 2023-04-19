import { AttachmentBuilder } from "discord.js";
import { DJSError, errorkeys } from "../core/error";

export class FileBuilder {
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