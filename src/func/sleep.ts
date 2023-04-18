import { DJSError, errorkeys } from "../core/error";

/**
 * Sleep function, like the Python library **time** (must be in an `async` function). 🛏️
 * @param ms The time to sleep, in milliseconds.
 * @returns {Promise}
 * 
 * @example
 * 
 * ```ts
 * console.log('Sleeping for 5 seconds...');
 * 
 * await sleep(5000);
 * 
 * console.log('5 seconds finished.');
 * ```
 */

export function sleep(ms: number): Promise<unknown> {
    if (!ms) throw new DJSError(errorkeys.MissingParam);

    if (typeof ms !== 'number') throw new DJSError(errorkeys.TypeError, 'number');

    return new Promise((res) => setTimeout(res, ms));
};