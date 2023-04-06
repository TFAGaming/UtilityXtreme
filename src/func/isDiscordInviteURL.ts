import { DJSError, errorkeys } from "../error";

/**
 * Checks a string whenever it includes a Discord server invite URL.
 * @param content The string to check.
 * @param ignoreURLs Ignore URLs if they exists on the string. Default: `[]`
 * @returns {boolean}
 */

export function isDiscordInviteURL(content: string, ignoreURLs?: string[]) {
    if (!content) throw new DJSError(errorkeys.MissingParam);

    if (typeof content !== 'string') throw new DJSError(errorkeys.TypeError, 'string');

    if (ignoreURLs) {
        if (!Array.isArray(ignoreURLs)) throw new DJSError(errorkeys.TypeError, 'array');
    };

    const regex = /discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})/g;

    const output = regex.test(content);

    const urls = content.match(regex)?.filter((url) => ignoreURLs?.find((web) => url.includes(web)));

    if (!urls?.length) return false;

    return output;
};