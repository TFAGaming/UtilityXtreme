import { DJSError, errorkeys } from "../core/error";
import { DiscordTimestampStyles } from "../global/enums";

export function createDiscordTimestamp(timestamp: number, type?: DiscordTimestampStyles): string {
    if (!timestamp) throw new DJSError(errorkeys.MissingParam);

    if (typeof timestamp !== 'number') throw new DJSError(errorkeys.TypeError, 'number');

    if (type) {
        if (typeof type !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
    };

    return `<t:${Math.floor(timestamp / 1000)}${type ? `:${type}` : ''}>`
};