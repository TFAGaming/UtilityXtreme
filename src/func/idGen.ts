/**
 * Generates a random integer that looks like an ID, by using `Date#now()` and `Math#random()`.
 * 
 * **Note:** There is a small, very *small* chance, probably 10^(-1000)% of getting two same IDs at same time.
 * @returns {number}
 */

export function idGen(): number {
    return (Date.now() + Math.floor(Math.random() * 999999999999));
};