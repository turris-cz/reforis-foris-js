/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

/* eslint import/export: "off" */

import React from "react";
import { UIDReset } from "react-uid";
import { StaticRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import PropTypes from "prop-types";

import { AlertContextMock } from "./alertContextMock";
import { CustomizationContextMock } from "./customizationContextMock";

Wrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

function Wrapper({ children }) {
    return (
        <CustomizationContextMock>
            <AlertContextMock>
                <StaticRouter>
                    <UIDReset>{children}</UIDReset>
                </StaticRouter>
            </AlertContextMock>
        </CustomizationContextMock>
    );
}

const customTestRender = (ui, options) =>
    render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customTestRender as render };
