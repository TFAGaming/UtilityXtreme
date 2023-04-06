/**
 * The Discord timestamp styles to use with the function `createDiscordTimestamp`.
 */

export enum TimestampStyles {
    /**
     * Example: `20:13`
     */
    ShortTime = "t",
    /**
     * Example: `20:13:47`
     */
    LongTime = "T",
    /**
     * Example: `05/04/2023`
     */
    ShortDate = "d",
    /**
     * Example: `5 April 2023`
     */
    LongDate = "D",
    /**
     * Example: `5 April 2023 20:13`
     */
    ShortDateTime = "f",
    /**
     * Example: `Wednesday, 5 April 2023 20:13`
     */
    LongDateTime = "F",
    /**
     * Example: `14 seconds ago`
     */
    RelativeTime = "R"  
}