import { DJSError, errorkeys } from "../core/error";

export function reverseString(string: string): string {
    if (!string) throw new DJSError(errorkeys.MissingParam);

    if (typeof string !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
    
    return string.split('').reverse().join('');
};