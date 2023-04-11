import { DJSError, errorkeys } from "../error"

interface RandomizedStringOptions {
    includesInteger?: boolean,
    includesCapitalizedLetters?: boolean
};

/**
 * Generates a random characters string with a specific length.
 * @param length The length of the string.
 * @param options Custom options. Default: `{}`
 * @returns {string}
 * 
 * @example
 * ```ts
 * randomizedString(6) // => Fdbj1A
 * 
 * randomizedString(6, { includesCapitalizedLetters: false }); // => dac45d
 * 
 * randomizedString(6, { includesInteger: false }), // => aFnvFD
 * ```
 */

export function randomizedString(length: number, options?: RandomizedStringOptions) {
    if (!length) throw new DJSError(errorkeys.MissingParam);

    if (typeof length !== 'number') throw new DJSError(errorkeys.TypeError, 'number');

    if (options) {
        if (typeof options !== 'object') throw new DJSError(errorkeys.TypeError, 'object');
    };

    const chars = `abcdefghijklmnopqrstuvwxyz${options?.includesCapitalizedLetters ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''}${options?.includesInteger ? '1234567890' : ''}`;

    let res = '';

    for (let i = 0; i < length; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    };

    return res;
};