export const errorkeys = {
    'InvalidToken': 'INVALID_TOKEN',
    'InvalidGuild': 'INVALID_GUILD',
    'InvalidChannelType': 'INVALID_CHANNEL_TYPE',

    'TypeError': 'TYPE_ERROR',
    'MissingParam': 'MISSING_PARAMETER',

    'TwoParamsChosen': 'TWO_PARAMS_CHOSEN',

    'NodeVersionError': 'NODE_VERSION_ERR',
    'NodejsMissingPackage': 'NODEJS_MISSING_PKG',

    'LengthMaxReached': 'LENGTH_MAX_REACHED',

    'InputNotAllowed': 'INPUT_NOT_ALLOWED'
};

const messages = {
    [errorkeys.InvalidToken]: () => 'An invalid token was provided.',
    [errorkeys.InvalidGuild]: () => 'An invalid guild ID was provided.',
    [errorkeys.InvalidChannelType]: (type: string) => 'The channel ID provided is not type of ' + type + '.',

    [errorkeys.TypeError]: (type: string) => 'The parameter is not type of ' + type + '.',
    [errorkeys.MissingParam]: () => 'A required parameter is not provided.',

    [errorkeys.TwoParamsChosen]: () => 'Two parameters has been set to an undefined value, expect one to be undefined value.',

    [errorkeys.NodeVersionError]: (versionRequired: string) => 'Your Node.js version is currently under the required version ' + versionRequired + '. Please install a version higher than the installed one.',
    [errorkeys.NodejsMissingPackage]: (pkg: string) => 'Couldn\'t find the module/package \'' + pkg + '\'. Use \'npm list ' + pkg + '\' to check if it\'s installed or not.',

    [errorkeys.LengthMaxReached]: (variableandlength: string) => `The variable/property ${variableandlength[0]} has reached the max length of ${variableandlength[1]}.`,

    [errorkeys.InputNotAllowed]: (between: any[]) => `The variable/property has received an input that is not in [${between.map((b) => b).join(', ')}]`
};

export class DJSError extends Error {
    constructor(key: string, ...args: any) {
        super(`[${key}] ${messages[key](args)}`);
    };
};