/*
 * Copyright (C) 2019-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import Button from "bootstrap/Button";

import { fireEvent, getByText, render, waitFor } from "customTestRender";
import mockAxios from "jest-mock-axios";
import { mockJSONError } from "testUtils/network";
import { mockSetAlert } from "testUtils/alertContextMock";

import ActionButtonWithModal from "../ActionButtonWithModal/ActionButtonWithModal";

describe("<ActionButtonWithModal/>", () => {
    let componentContainer;
    const ActionButton = (props) => (
        <Button type="button" {...props}>
            Action
        </Button>
    );

    beforeEach(() => {
        const { container } = render(
            <>
                <div id="modal-container" />
                <div id="alert-container" />
                <ActionButtonWithModal
                    actionTrigger={ActionButton}
                    actionUrl="/reforis/api/action"
                    modalTitle="Warning!"
                    modalMessage="Are you sure you want to perform this action?"
                    modalActionText="Confirm action"
                    modalActionProps={{ className: "btn-danger" }}
                    successMessage="Action request succeeded."
                    errorMessage="Action request failed."
                />
            </>
        );
        componentContainer = container;
    });

    it("Render button.", () => {
        expect(componentContainer).toMatchSnapshot();
    });

    it("Render modal.", () => {
        fireEvent.click(getByText(componentContainer, "Action"));
        expect(componentContainer).toMatchSnapshot();
    });

    it("Confirm action.", () => {
        fireEvent.click(getByText(componentContainer, "Action"));
        fireEvent.click(getByText(componentContainer, "Confirm action"));
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/api/action",
            undefined,
            expect.anything()
        );
    });

    it("Hold error.", async () => {
        fireEvent.click(getByText(componentContainer, "Action"));
        fireEvent.click(getByText(componentContainer, "Confirm action"));
        mockJSONError();
        await waitFor(() =>
            expect(mockSetAlert).toBeCalledWith("Action request failed.")
        );
    });

    it("Show success alert on successful action.", async () => {
        fireEvent.click(getByText(componentContainer, "Action"));
        fireEvent.click(getByText(componentContainer, "Confirm action"));
        mockAxios.mockResponse({ status: 200 });
        await waitFor(() =>
            expect(mockSetAlert).toBeCalledWith(
                "Action request succeeded.",
                "success"
            )
        );
    });
});
