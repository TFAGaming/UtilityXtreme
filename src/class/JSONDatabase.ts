import { DJSError, errorkeys } from "../error";
import {
    readFileSync,
    writeFileSync
} from 'fs';

export class JSONDatabase {
    path: string;

    /**
     * Creates a simple JSON database.
     * @param path The FileSystem path of the JSON file, starts from the main folder.
     * @param init Initialize the file, rewrites the file when the program starts with `{}`. Default: `false`
     */

    constructor(path: string, init?: boolean) {
        if (!path) throw new DJSError(errorkeys.MissingParam);

        if (typeof path !== 'string') throw new DJSError(errorkeys.TypeError, 'string');

        if (init) {
            if (typeof init !== 'boolean') throw new DJSError(errorkeys.TypeError, 'boolean');
        };

        this.path = path;
        
        if (init) this.init();
    };

    private write(data: string | object) {
        try {
            writeFileSync(this.path, JSON.stringify(data));

            return this;
        } catch { };
    };

    private read() {
        try {
            const data = JSON.parse(`${readFileSync(this.path)}`);

            return data;
        } catch { };
    };

    public set(variable: string, value: string | number | [] | object) {
        let data = this.read();

        data[variable] = value;

        this.write(data);

        return this;
    };

    public get(variable: string) {
        let data = this.read();

        return data[variable] || undefined;
    };

    public del(variable: string) {
        let data = this.read();

        if (variable in data) delete data[variable];

        this.write(data);

        return this;
    };

    public push(variable: string, value: string | number | [] | object) {
        let data = this.read();

        if (Array.isArray(data[variable])) {
            data[variable].push(value);

            this.write(data);
        };

        return this;
    };

    public pull(variable: string, filter: (item: any) => void) {
        let data = this.read();

        if (Array.isArray(data[variable])) {
            data[variable] = data[variable].filter(filter);

            this.write(data);
        };

        return this;
    };

    public has(variable: string) {
        let data = this.read();

        return variable in data;
    };

    public init() {
        let data = this.read();

        data = {};

        this.write(data);

        return this;
    };

    public keys() {
        let data = this.read();

        return Object.keys(data);
    };

    public length() {
        return this.keys().length;
    };
};