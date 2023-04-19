import { DJSError, errorkeys } from "../core/error";

export function calculateString(string: string): string {
    if (!string) throw new DJSError(errorkeys.MissingParam);

    if (typeof string !== 'string') throw new DJSError(errorkeys.TypeError, 'string');
    
    return new Function('return ' + string)();
};