import { GuildMember } from "discord.js"

/**
 * The events to use with the class `ApplicationCommandsLoader`.
 */

export interface LoaderEvents {
    'loaderStarted': [],
    'loaderFinished': [],
    'loaderRejected': []
}

/**
 * The events to use with the class `BoostDetector`.
 */

export interface BoostDetectorEvents {
    'boostCreate': [member: GuildMember]
    'boostRemove': [member: GuildMember]
}

/**
 * The events to use with the class `MongoDBConnector`.
 */

export interface MongoDBConnectorEvents {
    'mongodbConnected': [uri: string]
    'mongodbDisconnected': [err: any]
}