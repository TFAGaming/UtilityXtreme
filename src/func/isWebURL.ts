import { DJSError, errorkeys } from "../core/error";

export function isWebURL(content: string, ignoreURLs?: string[]): boolean {
    if (!content) throw new DJSError(errorkeys.MissingParam);

    if (typeof content !== 'string') throw new DJSError(errorkeys.TypeError, 'string');

    if (ignoreURLs) {
        if (!Array.isArray(ignoreURLs)) throw new DJSError(errorkeys.TypeError, 'array');
    };

    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;;

    const output = regex.test(content);

    const urls = content.match(regex)?.filter((url) => ignoreURLs?.find((web) => url.includes(web)));

    if (!urls?.length) return false;

    return output;
};