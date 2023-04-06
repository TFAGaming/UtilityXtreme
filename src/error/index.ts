export const errorkeys = {
    'InvalidToken': 'INVALID_TOKEN',
    'InvalidGuild': 'INVALID_GUILD',
    'InvalidChannelType': 'INVALID_CHANNEL_TYPE',

    'TypeError': 'TYPE_ERROR',
    'MissingParam': 'MISSING_PARAMETER',

    'TwoParamsChosen': 'TWO_PARAMS_CHOSEN',

    'NodeVersionError': 'NODE_VERSION_ERR',
};

const messages = {
    [errorkeys.InvalidToken]: () => 'An invalid token was provided.',
    [errorkeys.InvalidGuild]: () => 'An invalid guild ID was provided.',
    [errorkeys.InvalidChannelType]: (type: string) => 'The channel ID provided is not type of ' + type + '.',

    [errorkeys.TypeError]: (type: string) => 'The parameter is not type of ' + type + '.',
    [errorkeys.MissingParam]: () => 'A required parameter is not provided.',

    [errorkeys.TwoParamsChosen]: () => 'Two parameters has been set to true, expect one to be true.',

    [errorkeys.NodeVersionError]: (versionRequired: string) => 'Your Node.js version is currently under the required version ' + versionRequired + '. Please install a version higher than the installed one.'
};

export class DJSError extends Error {
    constructor(key: string, ...args: any) {
        super(`[${key}] ${messages[key](args)}`);
    };
};