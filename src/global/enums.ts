export enum DiscordTimestampStyles {
    ShortTime = "t",
    LongTime = "T",
    ShortDate = "d",
    LongDate = "D",
    ShortDateTime = "f",
    LongDateTime = "F",
    RelativeTime = "R"  
}

export enum BoostDetectorEvents {
    BoostCreate = 'boostCreate',
    BoostRemove = 'boostRemove',
};

export enum LoaderEvents {
    LoaderStarted = 'loaderStarted',
    LoaderFinished = 'loaderFinished',
    LoaderRejected = 'loaderRejected'
};

export enum MongoDBConnectorEvents {
    MongoDBConnected = 'mongodbConnected',
    mongodbDisconnected = 'mongodbDisconnected'
};