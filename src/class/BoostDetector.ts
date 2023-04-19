import { Client, GuildMember } from 'discord.js';
import { EventEmitter } from 'events';
import { DJSError, errorkeys } from '../core/error';

export class BoostDetector extends EventEmitter {
    constructor(client: Client) {
        if (!client) throw new DJSError(errorkeys.MissingParam);

        if (!(client instanceof Client)) throw new DJSError(errorkeys.TypeError, 'Client');

        super({
            captureRejections: true
        });

        client.on('guildMemberUpdate', (oldM, newM) => {
            if (newM.premiumSinceTimestamp != oldM.premiumSinceTimestamp) {
                this.emit('boostRemove', newM);

                return;
            };
            
            if (oldM.premiumSinceTimestamp != newM.premiumSinceTimestamp) {
                this.emit('boostCreate', newM);

                return;
            };
        });

    };
};