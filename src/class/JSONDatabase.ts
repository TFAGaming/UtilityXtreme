import { DJSError, errorkeys } from "../core/error";
import {
    readFileSync,
    writeFileSync
} from 'fs';

export class JSONDatabase {
    readonly path: string;

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

    /**
     * Overwrites the JSON file with new data.
     * @param data The data.
     * @returns {this}
     */

    private write(data: string | object) {
        try {
            writeFileSync(this.path, JSON.stringify(data));

            return this;
        } catch { };
    };

    /**
     * Reads the JSON file.
     * @returns {object}
     */

    private read() {
        try {
            const data = JSON.parse(`${readFileSync(this.path)}`);

            return data;
        } catch { };
    };

    /**
     * Add new property to the JSON file.
     * @param variable The property name.
     * @param value The property's value.
     * @returns {this}
     */

    public set(variable: string, value: string | number | [] | object) {
        let data = this.read();

        data[variable] = value;

        this.write(data);

        return this;
    };
    
    /**
     * Gets a property value from the JSON file.
     * @param variable The property name.
     * @returns {string | number | [] | object}
     */
    
    public get(variable: string) {
        let data = this.read();

        return data[variable] || undefined;
    };

    /**
     * Deletes a property from the JSON file.
     * @param variable The property name. If it doesn't exists in the object, then it will do nothing.
     * @returns {this}
     */

    public del(variable: string) {
        let data = this.read();

        if (variable in data) delete data[variable];

        this.write(data);

        return this;
    };

    /**
     * Push an item an array property in the JSON file.
     * @param variable The property name. If the property is not an array or doesn't exists in the object, then it will do nothing.
     * @param value The items to push.
     * @returns {this}
     */

    public push(variable: string, value: string | number | [] | object) {
        let data = this.read();

        if (variable in data && Array.isArray(data[variable])) {
            data[variable].push(value);

            this.write(data);
        };

        return this;
    };

    /**
     * Pulls an item from an array property in the JSON file.
     * @param variable The property name. If the property is not an array or doesn't exists in the object, then it will do nothing.
     * @param filter The filter to pull an item.
     * @returns {this}
     */

    public pull(variable: string, filter: (item: any) => void) {
        let data = this.read();

        if (variable in data && Array.isArray(data[variable])) {
            data[variable] = data[variable].filter(filter);

            this.write(data);
        };

        return this;
    };

    /**
     * Whenever the JSON file object includes a property.
     * @param variable The property name.
     * @returns {boolean}
     */

    public has(variable: string) {
        let data = this.read();

        return variable in data;
    };

    /**
     * Initialize the JSON file, overwrites the old data to an empty object (`{ }`).
     * @returns {this}
     */

    public init() {
        let data = this.read();

        data = {};

        this.write(data);

        return this;
    };

    /**
     * Returns an array of properties.
     * @returns {string[]}
     */

    public keys() {
        let data = this.read();

        return Object.keys(data);
    };

    /**
     * Returns the total of properties in the JSON file object.
     * @returns {number}
     */

    public length() {
        return this.keys().length;
    };
};