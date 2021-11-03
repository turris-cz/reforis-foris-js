/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import diffSnapshot from "snapshot-diff";
import mockAxios from "jest-mock-axios";

import { fireEvent, render, wait } from "customTestRender";
import { WebSockets } from "webSockets/WebSockets";
import { mockJSONError } from "testUtils/network";

import {
    wifiSettingsFixture,
    oneDevice,
    twoDevices,
    threeDevices,
} from "./__fixtures__/wifiSettings";
import { WiFiSettings, validator, byteCount } from "../WiFiSettings";

describe("<WiFiSettings/>", () => {
    let firstRender;
    let getAllByText;
    let getAllByLabelText;
    let getByText;
    let asFragment;
    const endpoint = "/reforis/api/wifi";

    beforeEach(async () => {
        const webSockets = new WebSockets();
        const renderRes = render(
            <WiFiSettings
                ws={webSockets}
                endpoint={endpoint}
                resetEndpoint="foo"
            />
        );
        asFragment = renderRes.asFragment;
        getAllByText = renderRes.getAllByText;
        getAllByLabelText = renderRes.getAllByLabelText;
        getByText = renderRes.getByText;
        mockAxios.mockResponse({ data: wifiSettingsFixture() });
        await wait(() => renderRes.getByText("Wi-Fi 1"));
        firstRender = renderRes.asFragment();
    });

    it("should handle error", async () => {
        const webSockets = new WebSockets();
        const { getByText } = render(
            <WiFiSettings
                ws={webSockets}
                ws={webSockets}
                endpoint={endpoint}
                resetEndpoint="foo"
            />
        );
        const errorMessage = "An API error occurred.";
        mockJSONError(errorMessage);
        await wait(() => {
            expect(getByText(errorMessage)).toBeTruthy();
        });
    });

    it("Snapshot both modules disabled.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Snapshot one module enabled.", () => {
        fireEvent.click(getByText("Wi-Fi 1"));
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Snapshot 2.4 GHz", () => {
        fireEvent.click(getByText("Wi-Fi 1"));
        const enabledRender = asFragment();
        fireEvent.click(getAllByText("2.4")[0]);
        expect(diffSnapshot(enabledRender, asFragment())).toMatchSnapshot();
    });

    it("Snapshot guest network.", () => {
        fireEvent.click(getByText("Wi-Fi 1"));
        const enabledRender = asFragment();
        fireEvent.click(getAllByText("Enable Guest Wi-Fi")[0]);
        expect(diffSnapshot(enabledRender, asFragment())).toMatchSnapshot();
    });

    it("Post form: both modules disabled.", () => {
        fireEvent.click(getByText("Save"));
        expect(mockAxios.post).toBeCalled();
        const data = {
            devices: [
                { enabled: false, id: 0 },
                { enabled: false, id: 1 },
            ],
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            endpoint,
            data,
            expect.anything()
        );
    });

    it("Post form: one module enabled.", () => {
        fireEvent.click(getByText("Wi-Fi 1"));

        fireEvent.click(getByText("Save"));
        expect(mockAxios.post).toBeCalled();
        const data = {
            devices: [
                {
                    SSID: "TestSSID1",
                    channel: 60,
                    enabled: true,
                    guest_wifi: { enabled: false },
                    hidden: false,
                    htmode: "HT80",
                    hwmode: "11a",
                    id: 0,
                    password: "TestPass",
                    encryption: "WPA3",
                },
                { enabled: false, id: 1 },
            ],
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            endpoint,
            data,
            expect.anything()
        );
    });

    it("Post form: 2.4 GHz", () => {
        fireEvent.click(getByText("Wi-Fi 1"));
        fireEvent.click(getAllByText("2.4")[0]);

        fireEvent.click(getByText("Save"));
        expect(mockAxios.post).toBeCalled();
        const data = {
            devices: [
                {
                    SSID: "TestSSID1",
                    channel: 0,
                    enabled: true,
                    guest_wifi: { enabled: false },
                    hidden: false,
                    htmode: "HT20",
                    hwmode: "11g",
                    id: 0,
                    password: "TestPass",
                    encryption: "WPA3",
                },
                { enabled: false, id: 1 },
            ],
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            endpoint,
            data,
            expect.anything()
        );
    });

    it("Post form: guest network.", () => {
        fireEvent.click(getByText("Wi-Fi 1"));
        fireEvent.click(getAllByText("Enable Guest Wi-Fi")[0]);
        fireEvent.change(getAllByLabelText("Password")[1], {
            target: { value: "test_password" },
        });

        fireEvent.click(getByText("Save"));
        expect(mockAxios.post).toBeCalled();
        const data = {
            devices: [
                {
                    SSID: "TestSSID1",
                    channel: 60,
                    enabled: true,
                    guest_wifi: {
                        SSID: "TestGuestSSID",
                        enabled: true,
                        password: "test_password",
                    },
                    hidden: false,
                    htmode: "HT80",
                    hwmode: "11a",
                    id: 0,
                    password: "TestPass",
                    encryption: "WPA3",
                },
                { enabled: false, id: 1 },
            ],
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            endpoint,
            data,
            expect.anything()
        );
    });

    it("Validator function using regex for one device", () => {
        expect(validator(oneDevice)).toEqual(null);
    });

    it("Validator function using regex for two devices", () => {
        const twoDevicesFormErrors = [{ SSID: "SSID can't be empty" }, {}];
        expect(validator(twoDevices)).toEqual(twoDevicesFormErrors);
    });

    it("Validator function using regex for three devices", () => {
        const threeDevicesFormErrors = [
            {},
            {},
            { password: "Password must contain at least 8 symbols" },
        ];
        expect(validator(threeDevices)).toEqual(threeDevicesFormErrors);
    });

    it("ByteCount function", () => {
        expect(byteCount("abc")).toEqual(3);
    });
});
