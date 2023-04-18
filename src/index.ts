import { DJSError, errorkeys } from './core/error';
import checkpackages from './core/pkg/checkpackages';

// Making sure that node.js version is 16.9.0 or above.
if (parseInt(process.version.replace('v', ' ').split('.').join('')) < 1690) throw new DJSError(errorkeys.NodeVersionError, 'v16.9.0');

// Making sure that discord.js is installed.
checkpackages();

/**
 * @module utilityxtreme
 */

export * from './class/index';
export * from './func/index';
export * from './global/enums';

/**
 * UtilityXtreme, © 2023
 * 
 * This project is under license GPL-3.0, any public copies of this project will be taken down by the developers.
 * 
 * Written in TypeScript, by T.F.A#7524.
 * T.F.A 7524 - Development • Imagine a Bot
 */