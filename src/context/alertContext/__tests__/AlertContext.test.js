/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render, getByText, queryByText, fireEvent } from "customTestRender";

import { useAlert, AlertContextProvider } from "../AlertContext";

function AlertTest() {
    const [setAlert, dismissAlert] = useAlert();
    // alert-container serves as an output for Portal which renders Alert
    return (
        <>
            <div id="alert-container" />
            <button onClick={() => setAlert("Alert content")}>Set alert</button>
            <button onClick={dismissAlert}>Dismiss alert</button>
        </>
    );
}

describe("AlertContext", () => {
    let componentContainer;

    beforeEach(() => {
        const { container } = render(
            <AlertContextProvider>
                <AlertTest />
            </AlertContextProvider>
        );
        componentContainer = container;
    });

    it("should render component without alert", () => {
        expect(componentContainer).toMatchSnapshot();
    });

    it("should render alert", () => {
        fireEvent.click(getByText(componentContainer, "Set alert"));
        expect(componentContainer).toMatchSnapshot();
    });

    it("should dismiss alert with alert button", async () => {
        fireEvent.click(getByText(componentContainer, "Set alert"));
        // Alert is present
        expect(getByText(componentContainer, "Alert content")).toBeDefined();

        fireEvent.click(componentContainer.querySelector(".btn-close"));
        // Alert is gone
        await (() =>
            expect(
                queryByText(componentContainer, "Alert content")
            ).toBeNull());
    });

    it("should dismiss alert with external button", () => {
        fireEvent.click(getByText(componentContainer, "Set alert"));
        // Alert is present
        expect(getByText(componentContainer, "Alert content")).toBeDefined();

        fireEvent.click(getByText(componentContainer, "Dismiss alert"));
        // Alert is gone
        expect(queryByText(componentContainer, "Alert content")).toBeNull();
    });
});
