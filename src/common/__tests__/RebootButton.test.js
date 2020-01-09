/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import {
    fireEvent, getByText, queryByText, render, wait,
} from "customTestRender";
import mockAxios from "jest-mock-axios";
import { mockJSONError } from "testUtils/network";
import { mockSetAlert } from "testUtils/alertContextMock";

import { RebootButton } from "../RebootButton";

describe("<RebootButton/>", () => {
    let componentContainer;
    beforeEach(() => {
        const { container } = render(<>
            <div id="modal-container" />
            <RebootButton />
        </>);
        componentContainer = container;
    });

    it("Render.", () => {
        expect(componentContainer)
            .toMatchSnapshot();
    });

    it("Render modal.", () => {
        expect(queryByText(componentContainer, "Confirm reboot"))
            .toBeNull();
        fireEvent.click(getByText(componentContainer, "Reboot"));
        expect(componentContainer)
            .toMatchSnapshot();
    });

    it("Confirm reboot.", () => {
        fireEvent.click(getByText(componentContainer, "Reboot"));
        fireEvent.click(getByText(componentContainer, "Confirm reboot"));
        expect(mockAxios.post)
            .toHaveBeenCalledWith("/reforis/api/reboot", undefined, expect.anything());
    });

    it("Hold error.", async () => {
        fireEvent.click(getByText(componentContainer, "Reboot"));
        fireEvent.click(getByText(componentContainer, "Confirm reboot"));
        mockJSONError();
        await wait(() => expect(mockSetAlert)
            .toBeCalledWith("Reboot request failed."));
    });
});
