import { DJSError, errorkeys } from "../error";

export default () => {
    try {
        require('discord.js');
    } catch {
        throw new DJSError(errorkeys.NodejsMissingPackage, 'discord.js');
    };
};