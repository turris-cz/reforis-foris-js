/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

/** Return undefined if object has no keys, otherwise return object. */
export function undefinedIfEmpty(instance) {
    if (Object.keys(instance).length > 0) {
        return instance;
    }
    return undefined;
}

/** Return object without keys that have undefined value. */
export function withoutUndefinedKeys(instance) {
    return Object.keys(instance).reduce(
        (accumulator, key) => {
            if (instance[key] !== undefined) {
                accumulator[key] = instance[key];
            }
            return accumulator;
        },
        {},
    );
}
