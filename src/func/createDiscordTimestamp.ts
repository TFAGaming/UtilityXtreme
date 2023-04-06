import { DJSError, errorkeys } from "../error";
import { TimestampStyles } from "../global/enums";

/**
 * Creates timestamp for Discord.
 * @param timestamp The timestamp, make sure that it's multiplied by `x1000` for milliseconds type if it's not from the `Date#now()` method.
 * @param type The timestamp type. Default: `''` (Empty string)
 * @returns {string}
 */

export function createDiscordTimestamp(timestamp: number, type?: TimestampStyles) {
    if (!timestamp) throw new DJSError(errorkeys.MissingParam);

    if (typeof timestamp !== 'number') throw new DJSError(errorkeys.TypeError, 'number');

    if (type) {
        if (typeof type !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
    };

    return `<t:${Math.floor(timestamp / 1000)}${type ? `:${type}` : ''}>`
};