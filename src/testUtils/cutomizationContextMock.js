/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

window.CustomizationContext = React.createContext();

const deviceDetails = {
    kernel: "5.x.x",
    model: "Turris Omnia",
    os_branch: {
        mode: "branch",
        value: "hbs",
    },
    os_version: "6.x.x",
    reforis_version: "1.x.x",
    serial: 123456789,
};

const isCustomized = false;

function CustomizationContextMock({ children }) {
    return (
        <CustomizationContext.Provider value={{ deviceDetails, isCustomized }}>
            {children}
        </CustomizationContext.Provider>
    );
}

export { CustomizationContextMock };
