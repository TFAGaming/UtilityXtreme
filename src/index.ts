import { DJSError, errorkeys } from './error';

if (parseInt(process.version.replace('v', ' ').split('.').join('')) < 1690) throw new DJSError(errorkeys.NodeVersionError, 'v16.9.0');

export * from './class/index';
export * from './func/index';
export * from './global/enums';

/**
 * UtilityXtreme, © 2023
 * 
 * This project is under license GPU, any copies of this project will be taken down by the developers.
 * 
 * Built with TypeScript, by T.F.A#7524.
 */