/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

/* eslint no-console: "off" */

import { ForisURLs } from "../utils/forisUrls";

const PROTOCOL = window.location.protocol === "http:" ? "ws" : "wss";

const URL = process.env.LIGHTTPD
    ? `${PROTOCOL}://${window.location.hostname}/foris-ws`
    : `${PROTOCOL}://${window.location.hostname}:${9081}`;

const WAITING_FOR_CONNECTION_TIMEOUT = 500;

export class WebSockets {
    constructor() {
        this.ws = new WebSocket(URL);
        this.ws.onerror = (e) => {
            if (window.location.pathname !== ForisURLs.login) {
                console.error(
                    "WS: Error observed, you aren't logged probably."
                );
                window.location.replace(ForisURLs.login);
            }
            console.error(`WS: Error: ${e}`);
        };
        this.ws.onmessage = (e) => {
            console.debug(`WS: Received Message: ${e.data}`);
            const data = JSON.parse(e.data);
            this.dispatch(data);
        };
        this.ws.onopen = () => {
            console.debug("WS: Connection open.");
        };
        this.ws.onclose = () => {
            console.debug("WS: Connection closed.");
        };

        // callbacks[module][action]
        this.callbacks = {};
    }

    waitForConnection(callback) {
        if (this.ws.readyState === 1) {
            callback();
        } else {
            const that = this;
            setTimeout(() => {
                that.waitForConnection(callback);
            }, WAITING_FOR_CONNECTION_TIMEOUT);
        }
    }

    bind(module, action, callback) {
        this.callbacks[module] = this.callbacks[module] || {};
        this.callbacks[module][action] = this.callbacks[module][action] || [];
        this.callbacks[module][action].push(callback);
        return this;
    }

    subscribe(module) {
        this.waitForConnection(() => {
            this.send("subscribe", module);
        });
        return this;
    }

    unbind(module, action, callback) {
        const callbacks = this.callbacks[module][action];

        const index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }

        if (callbacks.length === 0) {
            delete this.callbacks[module][action];
        }

        if (Object.keys(this.callbacks[module]).length === 0) {
            this.unsubscribe(module);
        }

        return this;
    }

    unsubscribe(module) {
        this.waitForConnection(() => {
            this.send("unsubscribe", module);
            delete this.callbacks[module];
        });
        return this;
    }

    send(action, params) {
        const payload = JSON.stringify({ action, params });
        this.waitForConnection(() => {
            this.ws.send(payload);
        });
        return this;
    }

    dispatch(json) {
        if (!json.module) return;

        let chain;
        try {
            chain = this.callbacks[json.module][json.action];
        } catch (error) {
            if (error instanceof TypeError) {
                console.warn(
                    `Callback for this message wasn't found:${error.data}`
                );
            } else throw error;
        }

        if (typeof chain === "undefined") return;

        chain.forEach((callback) => callback(json));
    }

    close() {
        this.ws.close();
    }
}
