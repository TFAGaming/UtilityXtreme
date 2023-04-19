import { DJSError, errorkeys } from "../core/error"

interface RandomizedStringOptions {
    includesInteger?: boolean,
    includesCapitalizedLetters?: boolean
};

export function randomizedString(length: number, options?: RandomizedStringOptions): string {
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