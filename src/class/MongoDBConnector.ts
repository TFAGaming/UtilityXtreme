import { EventEmitter } from 'events';
import { DJSError, errorkeys } from '../core/error';
import mongoose from 'mongoose';

export class MongoDBConnector extends EventEmitter {
    constructor(uri: string) {
        if (!uri) throw new DJSError(errorkeys.MissingParam);

        if (typeof uri !== 'string') throw new DJSError(errorkeys.TypeError, 'string');

        super({
            captureRejections: true
        });

        mongoose.connect(uri)
            .then(() => {
                this.emit('mongodbConnected', uri);
            })
            .catch((err) => {
                this.emit('mongodbDisconnected', err);
            });
    };
};