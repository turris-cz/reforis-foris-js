/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import mockAxios from "jest-mock-axios";
import moment from "moment-timezone";
import "./mockGlobals";

// Setup axios cleanup
global.afterEach(() => {
    mockAxios.reset();
});

// Mock web sockets
window.WebSocket = jest.fn();

// Mock scrollIntoView
global.HTMLElement.prototype.scrollIntoView = () => {};

// Mock timezone utilities
jest.doMock("moment", () => {
    moment.tz.setDefault("UTC");
    return moment;
});
Date.now = jest.fn(() => new Date(Date.UTC(2019, 1, 1, 12, 13, 14)).valueOf());
