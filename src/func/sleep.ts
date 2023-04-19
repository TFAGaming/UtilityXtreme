import { DJSError, errorkeys } from "../core/error";

export function sleep(ms: number): Promise<unknown> {
    if (!ms) throw new DJSError(errorkeys.MissingParam);

    if (typeof ms !== 'number') throw new DJSError(errorkeys.TypeError, 'number');

    return new Promise((res) => setTimeout(res, ms));
};