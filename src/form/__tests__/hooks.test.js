/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { act, fireEvent, render, waitForElement } from "customTestRender";
import mockAxios from "jest-mock-axios";
import WebSockets from "webSockets/WebSockets";
import ForisForm from "../components/ForisForm";

// It's possible to unittest each hooks via react-hooks-testing-library.
// But it's better and easier to test it by test components which uses this hooks.

const TestForm = ({ formData, formErrors, setFormValue }) => (
    <>
        <input
            data-testid="test-input"
            value={formData.field}
            onChange={setFormValue((value) => ({ field: { $set: value } }))}
        />
        <p>{formErrors.field}</p>
    </>
);

describe("useForm hook.", () => {
    let mockValidator;
    let mockPrepData;
    let mockPrepDataToSubmit;
    let input;
    let form;
    const Child = jest.fn((props) => <TestForm {...props} />);

    beforeEach(async () => {
        mockPrepData = jest.fn(() => ({ field: "preparedData" }));
        mockPrepDataToSubmit = jest.fn(() => ({
            field: "preparedDataToSubmit",
        }));
        mockValidator = jest.fn((data) =>
            data.field === "invalidValue" ? { field: "Error" } : {}
        );
        const { getByTestId, container } = render(
            <ForisForm
                ws={new WebSockets()}
                // Just some module which exists...
                forisConfig={{
                    endpoint: "testEndpoint",
                    wsModule: "testWSModule",
                }}
                prepData={mockPrepData}
                prepDataToSubmit={mockPrepDataToSubmit}
                validator={mockValidator}
            >
                <Child />
            </ForisForm>
        );
        mockAxios.mockResponse({ field: "fetchedData" });

        input = await waitForElement(() => getByTestId("test-input"));
        form = container.firstChild.firstChild;
    });

    it("Validation on changing.", () => {
        expect(mockValidator).toHaveBeenCalledTimes(1);
        expect(Child).toHaveBeenCalledTimes(1);
        expect(Child.mock.calls[0][0].formErrors).toMatchObject({});

        act(() => {
            fireEvent.change(input, {
                target: { value: "invalidValue", type: "text" },
            });
        });

        expect(Child).toHaveBeenCalledTimes(2);
        expect(mockValidator).toHaveBeenCalledTimes(2);
        expect(Child.mock.calls[1][0].formErrors).toMatchObject({
            field: "Error",
        });
    });

    it("Update text value.", () => {
        fireEvent.change(input, {
            target: { value: "newValue", type: "text" },
        });
        expect(input.value).toBe("newValue");
    });

    it("Update text value.", () => {
        fireEvent.change(input, { target: { value: 123, type: "number" } });
        expect(input.value).toBe("123");
    });

    it("Update checkbox value.", () => {
        fireEvent.change(input, {
            target: { checked: true, type: "checkbox" },
        });
        expect(input.checked).toBe(true);
    });

    it("Fetch data.", () => {
        expect(mockAxios.get).toHaveBeenCalledWith(
            "testEndpoint",
            expect.anything()
        );
        expect(mockPrepData).toHaveBeenCalledTimes(1);
        expect(Child.mock.calls[0][0].formData).toMatchObject({
            field: "preparedData",
        });
    });

    it("Submit.", () => {
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockPrepDataToSubmit).toHaveBeenCalledTimes(0);

        fireEvent.submit(form);

        expect(mockPrepDataToSubmit).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            "testEndpoint",
            { field: "preparedDataToSubmit" },
            expect.anything()
        );
    });
});
