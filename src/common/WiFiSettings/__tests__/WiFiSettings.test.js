/*
 * Copyright (C) 2019-2026 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import diffSnapshot from "snapshot-diff";
import mockAxios from "jest-mock-axios";

import { fireEvent, render, waitFor } from "customTestRender";
import WebSockets from "webSockets/WebSockets";
import { mockJSONError } from "testUtils/network";

import {
    wifiSettingsFixture,
    wifi7SettingsFixture,
    multiBandSettingsFixture,
    multiDevice6GHzSettingsFixture,
    oneDevice,
    twoDevices,
    threeDevices,
} from "./__fixtures__/wifiSettings";
import WiFiSettings, { validator, byteCount } from "../WiFiSettings";

describe("<WiFiSettings/>", () => {
    let firstRender;
    let getAllByText;
    let getAllByLabelText;
    let getByText;
    let getByLabelText;
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
        getByLabelText = renderRes.getByLabelText;
        getByText = renderRes.getByText;
        mockAxios.mockResponse({ data: wifiSettingsFixture() });
        await waitFor(() => renderRes.getByText("Wi-Fi 1"));
        firstRender = renderRes.asFragment();
    });

    it("should handle error", async () => {
        const webSockets = new WebSockets();
        const { getByText } = render(
            <WiFiSettings
                ws={webSockets}
                endpoint={endpoint}
                resetEndpoint="foo"
            />
        );
        const errorMessage = "An API error occurred.";
        mockJSONError(errorMessage);
        await waitFor(() => {
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
        fireEvent.click(getAllByText(/2.4/)[0]);
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
                    band: "5g",
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
        fireEvent.click(getAllByText(/2.4/)[0]);

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
                    htmode: "VHT80",
                    band: "2g",
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
                        encryption: "WPA2",
                        password: "test_password",
                    },
                    hidden: false,
                    htmode: "HT80",
                    band: "5g",
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

    it("Should validate password length", () => {
        const shortErrorFeedback = /Password must contain/i;
        const longErrorFeedback = /Password must not contain/i;

        fireEvent.click(getByText("Wi-Fi 1"));

        const passwordInput = getByLabelText("Password");

        const changePassword = (value) =>
            fireEvent.change(passwordInput, { target: { value } });

        changePassword("12");
        expect(getByText(shortErrorFeedback)).toBeDefined();

        changePassword(
            "longpasswordlongpasswordlongpasswordlongpasswordlongpasswordlong"
        );
        expect(getByText(longErrorFeedback)).toBeDefined();
    });
});

describe("<WiFiSettings: 6GHz/>", () => {
    let firstRender;
    let getByText;
    let getByLabelText;
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
        getByLabelText = renderRes.getByLabelText;
        getByText = renderRes.getByText;
        mockAxios.mockResponse({ data: wifi7SettingsFixture() });
        await waitFor(() => renderRes.getByText("Wi-Fi 1"));
        firstRender = renderRes.asFragment();
    });

    it("should handle error", async () => {
        const webSockets = new WebSockets();
        const { getByText } = render(
            <WiFiSettings
                ws={webSockets}
                endpoint={endpoint}
                resetEndpoint="foo"
            />
        );
        const errorMessage = "An API error occurred.";
        mockJSONError(errorMessage);
        await waitFor(() => {
            expect(getByText(errorMessage)).toBeTruthy();
        });
    });

    it("Snapshot module disabled.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Snapshot one module enabled.", () => {
        fireEvent.click(getByText("Wi-Fi 1"));
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });
});

describe("<WiFiSettings: switching to 6GHz/>", () => {
    let getAllByText;
    let getByText;
    let getAllByLabelText;
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
        getAllByText = renderRes.getAllByText;
        getByText = renderRes.getByText;
        getAllByLabelText = renderRes.getAllByLabelText;
        mockAxios.mockResponse({ data: multiBandSettingsFixture() });
        await waitFor(() => renderRes.getByText("Wi-Fi 1"));
    });

    // The 6 GHz band offers WPA3 as the only encryption choice, so the form
    // value has to follow the band, otherwise the previously selected mode
    // (e.g. WPA2/3) is submitted while the select displays WPA3.
    it("Post form: encryption is WPA3 after switching to 6 GHz.", () => {
        fireEvent.click(getAllByText(/^6 GHz$/)[0]);
        fireEvent.click(getByText("Save"));

        expect(mockAxios.post).toBeCalled();
        expect(mockAxios.post).toHaveBeenCalledWith(
            endpoint,
            {
                devices: [
                    expect.objectContaining({
                        band: "6g",
                        encryption: "WPA3",
                    }),
                ],
            },
            expect.anything()
        );
    });

    // The guest network shares the radio with the main one, so its encryption
    // has to follow the band as well.
    it("Post form: guest encryption is WPA3 after switching to 6 GHz.", () => {
        fireEvent.click(getAllByText(/^6 GHz$/)[0]);
        fireEvent.click(getByText("Save"));

        expect(mockAxios.post).toBeCalled();
        expect(mockAxios.post).toHaveBeenCalledWith(
            endpoint,
            {
                devices: [
                    expect.objectContaining({
                        guest_wifi: expect.objectContaining({
                            encryption: "WPA3",
                        }),
                    }),
                ],
            },
            expect.anything()
        );
    });

    it("Guest encryption select offers WPA3 only on 6 GHz.", () => {
        const guestEncryptionSelect = () =>
            getAllByLabelText("Encryption")[1].querySelectorAll("option");

        expect(guestEncryptionSelect()).toHaveLength(3);

        fireEvent.click(getAllByText(/^6 GHz$/)[0]);

        expect(guestEncryptionSelect()).toHaveLength(1);
        expect(guestEncryptionSelect()[0].value).toBe("WPA3");
    });
});

describe("<WiFiSettings: last device delivered on 6GHz/>", () => {
    const endpoint = "/reforis/api/wifi";
    const lastDeviceIndex = multiDevice6GHzSettingsFixture().devices.length - 1;

    async function renderSettings(fixture = multiDevice6GHzSettingsFixture()) {
        const webSockets = new WebSockets();
        const renderRes = render(
            <WiFiSettings
                ws={webSockets}
                endpoint={endpoint}
                resetEndpoint="foo"
            />
        );
        mockAxios.mockResponse({ data: fixture });
        await waitFor(() => renderRes.getByText("Wi-Fi 1"));
        // The guest network of the last device is the only enabled one, so
        // the selects of that device are the last two rendered ones.
        const [mainEncryption, guestEncryption] = renderRes
            .getAllByLabelText("Encryption")
            .slice(-2);
        return { ...renderRes, mainEncryption, guestEncryption };
    }

    function postedLastDevice() {
        return mockAxios.post.mock.calls[0][1].devices[lastDeviceIndex];
    }

    // A select whose value is not among its options displays the first one
    // instead, so an unsupported encryption looks like WPA3 in the form while
    // it is still submitted as e.g. WPA2/3.
    it("Post form: encryption of a device delivered on 6 GHz is WPA3.", async () => {
        const { getByText } = await renderSettings();

        fireEvent.click(getByText("Save"));

        expect(mockAxios.post).toBeCalled();
        expect(postedLastDevice().band).toBe("6g");
        expect(postedLastDevice().encryption).toBe("WPA3");
        expect(postedLastDevice().guest_wifi.encryption).toBe("WPA3");
    });

    it("Post form: encryption selects submit what they display.", async () => {
        const { getByText, mainEncryption, guestEncryption } =
            await renderSettings();
        expect(mainEncryption.querySelectorAll("option")).toHaveLength(1);
        expect(guestEncryption.querySelectorAll("option")).toHaveLength(1);

        fireEvent.click(getByText("Save"));

        expect(postedLastDevice().encryption).toBe(mainEncryption.value);
        expect(postedLastDevice().guest_wifi.encryption).toBe(
            guestEncryption.value
        );
    });

    // A custom encryption comes from a hand-made configuration, submitting
    // WPA3 instead of it would silently rewrite that configuration.
    it("Post form: custom encryption is kept on 6 GHz.", async () => {
        const fixture = multiDevice6GHzSettingsFixture();
        fixture.devices[lastDeviceIndex].encryption = "custom";
        const { getByText, mainEncryption } = await renderSettings(fixture);

        expect(mainEncryption.querySelectorAll("option")).toHaveLength(2);
        expect(mainEncryption.value).toBe("custom");

        fireEvent.click(getByText("Save"));

        expect(postedLastDevice().encryption).toBe("custom");
    });
});
