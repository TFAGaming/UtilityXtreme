/**
 * Generates a random Hex color code.
 * 
 * @example `#32cd32`
 * @returns {string}
 */

export function hexColorGen(): string {
    return ('#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6));
};