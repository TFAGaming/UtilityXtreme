import { DJSError, errorkeys } from "../error";

/**
 * Reverses a string.
 * @param string The string to reverse.
 * @returns {string}
 */

export function reverseString(string: string) {
    if (!string) throw new DJSError(errorkeys.MissingParam);

    if (typeof string !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
    
    return string.split('').reverse().join('');
};