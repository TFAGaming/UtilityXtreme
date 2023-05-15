import { DiscordTimestampStyles } from "./enumerations";

/**
 * Calculates a simple math equation string.
 * @param string 
 * 
 * @example
 * ```ts
 * calculateString('5+6'); // => '11'
 * ```
 */

export function calculateString(string: string): string;

/**
 * Replaces some specific characters in a string with a replacer.
 * @param string The string to replace it's characters.
 * @param words The characters to replace.
 * @param replacer The replacer. By default: `*`.
 */

export function censorString(string: string, words: string[], replacer?: string): string;

/**
 * Creates a Discord timestamp.
 * @param timestamp The timestamp. You can use `Date#now()`.
 * @param style The style of the timestamp.
 */

export function createDiscordTimestamp(timestamp: number, style?: DiscordTimestampStyles): string;

/**
 * Generates a random HEX color code.
 */

export function hexColorGen(): string;

/**
 * Generates a random ID.
 */

export function idGen(): number;

/**
 * Detects whenever the provided string includes a Discord invite URL.
 * @param content The string to check.
 * @param ignoreURLs Ignore specific URLs.
 */

export function isDiscordInviteURL(content: string, ignoreURLs?: string[]): boolean;

/**
 * Detects whenever the provided string includes any website URL.
 * @param content The string to check.
 * @param ignoreURLs Ignore specific URLs.
 */

export function isWebURL(content: string, ignoreURLs?: string[]): boolean;

/**
 * Generates a string with random characters and numbers.
 * @param length The length of the string.
 * @param options Custom options.
 */

export function randomizedString(length: number, options?: {
    includesCapitalizedLetters?: boolean,
    includesInteger?: boolean
}): string;

/**
 * Reverses a string.
 * @param string The string to reverse.
 */

export function reverseString(string: string): string;

/**
 * Sleeps for specific millisecond time.
 * 
 * **Warn:** Use this function in an `async` function and use the keyword `await` before the function sleep() to make it working.
 * @param ms The time to sleep, in milliseconds.
 */

export function sleep(ms: number): Promise<unknown>;