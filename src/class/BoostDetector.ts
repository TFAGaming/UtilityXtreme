import { Client, GuildMember } from 'discord.js';
import { EventEmitter } from 'events';
import { DJSError, errorkeys } from '../core/error';

interface BoostDetectorEvents {
    'boostCreate': [member: GuildMember]
    'boostRemove': [member: GuildMember]
};

export class BoostDetector extends EventEmitter {
    /**
     * Detects whenever a guild member has boosted a server.
     * @param client The client.
     * @extends {EventEmitter}
     */

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

    public on<K extends keyof BoostDetectorEvents>(eventName: K, listener: (...args: BoostDetectorEvents[K]) => void) { return this };
    public once<K extends keyof BoostDetectorEvents>(eventName: K, listener: (...args: BoostDetectorEvents[K]) => void) { return this };
};