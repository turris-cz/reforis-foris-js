/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { render, fireEvent } from "customTestRender";

import { NumberInput } from "../NumberInput";

describe("<NumberInput/>", () => {
    const onChangeMock = jest.fn();
    let container;
    let getByLabelText;

    beforeEach(() => {
        ({ container, getByLabelText } = render(
            <NumberInput
                label="Test label"
                helpText="Some help text"
                value={1}
                onChange={onChangeMock}
            />
        ));
    });

    it("Render number input", () => {
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Increase number with button", () => {
        const increaseButton = getByLabelText("Increase");
        fireEvent.click(increaseButton);
        expect(onChangeMock).toHaveBeenCalledWith({"target": {"value": 2}});
    });

    it("Decrease number with button", () => {
        const decreaseButton = getByLabelText("Decrease");
        fireEvent.click(decreaseButton);
        expect(onChangeMock).toHaveBeenCalledWith({"target": {"value": 0}});
    });
});
