/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

window.CustomizationContext = React.createContext();

const deviceDetails = {};
const isCustomized = jest.fn();

function CustomizationContextMock({ children }) {
    return (
        <CustomizationContext.Provider value={(deviceDetails, isCustomized)}>
            {children}
        </CustomizationContext.Provider>
    );
}

export { CustomizationContextMock };
