import { GuildMember } from "discord.js"

/**
 * The events to use with the class `ApplicationCommandsLoader`.
 */

interface LoaderEvents {
    'loaderStarted': [],
    'loaderFinished': [],
    'loaderRejected': []
}

/**
 * The events to use with the class `BoostDetector`.
 */

interface BoostDetectorEvents {
    'boostCreate': [member: GuildMember]
    'boostRemove': [member: GuildMember]
}