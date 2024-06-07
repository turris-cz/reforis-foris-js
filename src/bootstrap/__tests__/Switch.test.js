/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { render } from "customTestRender";

import Switch from "../Switch";

describe("<Switch/>", () => {
    it("Render switch", () => {
        const { container } = render(
            <Switch
                label="Test label"
                checked
                helpText="Some help text"
                onChange={() => {}}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Render uncheked switch", () => {
        const { container } = render(
            <Switch label="Test label" helpText="Some help text" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
