import { DJSError, errorkeys } from "../core/error";

export function censorString(string: string, words: string[], replacer?: string): string {
    if (!string) throw new DJSError(errorkeys.MissingParam);
    if (!words) throw new DJSError(errorkeys.MissingParam);

    if (typeof string !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
    if (!Array.isArray(words)) throw new DJSError(errorkeys.TypeError, 'array');

    if (replacer) {
        if (typeof replacer !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
    };

    let newstring = string;
    
    words.forEach((word) => {
        if (string.includes(word)) {
            newstring = newstring.replace(word, replacer ? replacer.repeat(word.length) : '*'.repeat(word.length));
        };
    });

    return newstring;
};