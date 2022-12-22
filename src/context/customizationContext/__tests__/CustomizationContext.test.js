/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { render, wait, getByText } from "customTestRender";
import mockAxios from "jest-mock-axios";

import {
    useCustomizationContext,
    CustomizationContextProvider,
} from "../CustomizationContext";

const CUSTOM = "Description / component for customized reForis (Shield)";
const ORIGINAL = "Description / component for original reForis (other devices)";

const CustomizationTest = () => {
    const { isCustomized } = useCustomizationContext();

    return <p>{isCustomized ? CUSTOM : ORIGINAL}</p>;
};

describe("CustomizationContext", () => {
    let componentContainer;
    beforeEach(() => {
        const { container } = render(
            <CustomizationContextProvider>
                <CustomizationTest />
            </CustomizationContextProvider>
        );
        componentContainer = container;
    });

    it("should render component without customization", async () => {
        mockAxios.mockResponse({ data: {} });

        await wait(() => getByText(componentContainer, ORIGINAL));

        expect(componentContainer).toMatchSnapshot();
    });

    it("should render customized component", async () => {
        mockAxios.mockResponse({ data: { customization: "shield" } });

        await wait(() => getByText(componentContainer, CUSTOM));

        expect(componentContainer).toMatchSnapshot();
    });
});
