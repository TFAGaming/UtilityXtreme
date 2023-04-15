import { DJSError, errorkeys } from './error';

if (parseInt(process.version.replace('v', ' ').split('.').join('')) < 1690) throw new DJSError(errorkeys.NodeVersionError, 'v16.9.0');

/**
 * @module utilityxtreme
 */

export * from './class/index';
export * from './func/index';
export * from './global/enums';
export * from './helpers/index';

/**
 * UtilityXtreme, © 2023
 * 
 * This project is under license GPL-3.0, any public copies of this project will be taken down by the developers.
 * 
 * Built with TypeScript, by T.F.A#7524.
 * T.F.A 7524 - Development • Imagine a Bot
 */