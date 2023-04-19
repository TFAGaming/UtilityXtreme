/**
 * The Discord timestamp styles to use with the function `createDiscordTimestamp`.
 */

export enum DiscordTimestampStyles {
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

/**
 * The possible events to use with the class `BoostDetector`.
 */

export enum BoostDetectorEvents {
    /**
     * Whenever a guild member has boosted a server.
     */
    BoostCreate = 'boostCreate',
    /**
     * Whenever a guild member has removed a boost from a server.
     */
    BoostRemove = 'boostRemove',
};

/**
 * The possible events to use with the class `ApplicationCommandsLoader`
 */

export enum LoaderEvents {
    /**
     * Whenever the loader starts.
     */
    LoaderStarted = 'loaderStarted',
    /**
     * Whenever the application commands has been loaded through Discord.
     */
    LoaderFinished = 'loaderFinished',
    /**
     * Whenever the loader has found a problem.
     */
    LoaderRejected = 'loaderRejected'
};