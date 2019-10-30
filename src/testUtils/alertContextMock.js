/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { AlertContext } from "../alertContext/AlertContext";

const mockSetAlert = jest.fn();
const mockDismissAlert = jest.fn();

function AlertContextMock({ children }) {
    return (
        <AlertContext.Provider value={[mockSetAlert, mockDismissAlert]}>
                { children }
        </AlertContext.Provider>
    );
}

export { AlertContextMock, mockSetAlert, mockDismissAlert };
