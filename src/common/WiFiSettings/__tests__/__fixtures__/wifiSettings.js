/*
 * Copyright (C) 2019-2026 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export function wifiSettingsFixture() {
    return {
        devices: [
            {
                SSID: "TestSSID1",
                available_bands: [
                    {
                        available_channels: [
                            {
                                frequency: 2412,
                                number: 1,
                                radar: false,
                            },
                            {
                                frequency: 2417,
                                number: 2,
                                radar: false,
                            },
                            {
                                frequency: 2422,
                                number: 3,
                                radar: false,
                            },
                            {
                                frequency: 2427,
                                number: 4,
                                radar: false,
                            },
                            {
                                frequency: 2432,
                                number: 5,
                                radar: false,
                            },
                            {
                                frequency: 2437,
                                number: 6,
                                radar: false,
                            },
                            {
                                frequency: 2442,
                                number: 7,
                                radar: false,
                            },
                            {
                                frequency: 2447,
                                number: 8,
                                radar: false,
                            },
                            {
                                frequency: 2452,
                                number: 9,
                                radar: false,
                            },
                            {
                                frequency: 2457,
                                number: 10,
                                radar: false,
                            },
                            {
                                frequency: 2462,
                                number: 11,
                                radar: false,
                            },
                        ],
                        available_htmodes: [
                            "NOHT",
                            "HT20",
                            "HT40",
                            "VHT20",
                            "VHT40",
                            "VHT80",
                        ],
                        band: "2g",
                    },
                    {
                        available_channels: [
                            {
                                frequency: 5180,
                                number: 36,
                                radar: false,
                            },
                            {
                                frequency: 5200,
                                number: 40,
                                radar: false,
                            },
                            {
                                frequency: 5220,
                                number: 44,
                                radar: false,
                            },
                            {
                                frequency: 5240,
                                number: 48,
                                radar: false,
                            },
                            {
                                frequency: 5260,
                                number: 52,
                                radar: true,
                            },
                            {
                                frequency: 5280,
                                number: 56,
                                radar: true,
                            },
                            {
                                frequency: 5300,
                                number: 60,
                                radar: true,
                            },
                            {
                                frequency: 5320,
                                number: 64,
                                radar: true,
                            },
                            {
                                frequency: 5500,
                                number: 100,
                                radar: true,
                            },
                            {
                                frequency: 5520,
                                number: 104,
                                radar: true,
                            },
                            {
                                frequency: 5540,
                                number: 108,
                                radar: true,
                            },
                            {
                                frequency: 5560,
                                number: 112,
                                radar: true,
                            },
                            {
                                frequency: 5580,
                                number: 116,
                                radar: true,
                            },
                            {
                                frequency: 5600,
                                number: 120,
                                radar: true,
                            },
                            {
                                frequency: 5620,
                                number: 124,
                                radar: true,
                            },
                            {
                                frequency: 5640,
                                number: 128,
                                radar: true,
                            },
                            {
                                frequency: 5660,
                                number: 132,
                                radar: true,
                            },
                            {
                                frequency: 5680,
                                number: 136,
                                radar: true,
                            },
                            {
                                frequency: 5700,
                                number: 140,
                                radar: true,
                            },
                            {
                                frequency: 5720,
                                number: 144,
                                radar: true,
                            },
                            {
                                frequency: 5745,
                                number: 149,
                                radar: false,
                            },
                            {
                                frequency: 5765,
                                number: 153,
                                radar: false,
                            },
                            {
                                frequency: 5785,
                                number: 157,
                                radar: false,
                            },
                            {
                                frequency: 5805,
                                number: 161,
                                radar: false,
                            },
                            {
                                frequency: 5825,
                                number: 165,
                                radar: false,
                            },
                        ],
                        available_htmodes: [
                            "NOHT",
                            "HT20",
                            "HT40",
                            "VHT20",
                            "VHT40",
                            "VHT80",
                        ],
                        band: "5g",
                    },
                ],
                channel: 60,
                enabled: false,
                guest_wifi: {
                    SSID: "TestGuestSSID",
                    enabled: false,
                    encryption: "WPA2",
                    password: "",
                },
                hidden: false,
                htmode: "HT80",
                band: "5g",
                id: 0,
                password: "TestPass",
                encryption: "WPA3",
            },
            {
                SSID: "Turris",
                available_bands: [
                    {
                        available_channels: [
                            {
                                frequency: 2412,
                                number: 1,
                                radar: false,
                            },
                            {
                                frequency: 2417,
                                number: 2,
                                radar: false,
                            },
                            {
                                frequency: 2422,
                                number: 3,
                                radar: false,
                            },
                            {
                                frequency: 2427,
                                number: 4,
                                radar: false,
                            },
                            {
                                frequency: 2432,
                                number: 5,
                                radar: false,
                            },
                            {
                                frequency: 2437,
                                number: 6,
                                radar: false,
                            },
                            {
                                frequency: 2442,
                                number: 7,
                                radar: false,
                            },
                            {
                                frequency: 2447,
                                number: 8,
                                radar: false,
                            },
                            {
                                frequency: 2452,
                                number: 9,
                                radar: false,
                            },
                            {
                                frequency: 2457,
                                number: 10,
                                radar: false,
                            },
                            {
                                frequency: 2462,
                                number: 11,
                                radar: false,
                            },
                        ],
                        available_htmodes: ["NOHT", "HT20", "HT40"],
                        band: "2g",
                    },
                ],
                channel: 11,
                enabled: false,
                guest_wifi: {
                    SSID: "TestSSID",
                    enabled: false,
                    password: "",
                },
                hidden: false,
                htmode: "HT40",
                band: "2g",
                id: 1,
                password: "TestPass",
                encryption: "WPA3",
            },
        ],
    };
}

export function wifi7SettingsFixture() {
    return {
        devices: [
            {
                SSID: "TestSSID Wi-Fi 7",
                available_bands: [
                    {
                        available_channels: [
                            {
                                frequency: 5955,
                                number: 1,
                                radar: false,
                            },
                            {
                                frequency: 5975,
                                number: 5,
                                radar: false,
                            },
                            {
                                frequency: 5995,
                                number: 9,
                                radar: false,
                            },
                            {
                                frequency: 6015,
                                number: 13,
                                radar: false,
                            },
                            {
                                frequency: 6035,
                                number: 17,
                                radar: false,
                            },
                            {
                                frequency: 6055,
                                number: 21,
                                radar: false,
                            },
                            {
                                frequency: 6075,
                                number: 25,
                                radar: false,
                            },
                        ],
                        available_htmodes: [
                            "NOHT",
                            "HT20",
                            "HT40",
                            "VHT20",
                            "VHT40",
                            "VHT80",
                            "VHT160",
                        ],
                        band: "6g",
                    },
                ],
                channel: 1,
                enabled: false,
                guest_wifi: {
                    SSID: "TestGuestSSID Wi-Fi 7",
                    enabled: false,
                    encryption: "WPA3",
                    password: "",
                },
                hidden: false,
                htmode: "VHT160",
                band: "6g",
                id: 0,
                password: "TestPass",
                encryption: "WPA3",
            },
        ],
    };
}

export function multiBandSettingsFixture() {
    return {
        devices: [
            {
                SSID: "TestSSID Multi Band",
                available_bands: [
                    {
                        available_channels: [
                            {
                                frequency: 5180,
                                number: 36,
                                radar: false,
                            },
                            {
                                frequency: 5200,
                                number: 40,
                                radar: false,
                            },
                        ],
                        available_htmodes: ["NOHT", "HT20", "HT40", "VHT80"],
                        band: "5g",
                    },
                    {
                        available_channels: [
                            {
                                frequency: 5955,
                                number: 1,
                                radar: false,
                            },
                            {
                                frequency: 5975,
                                number: 5,
                                radar: false,
                            },
                        ],
                        available_htmodes: ["NOHT", "HT20", "HT40", "VHT160"],
                        band: "6g",
                    },
                ],
                channel: 36,
                enabled: true,
                guest_wifi: {
                    SSID: "TestGuestSSID Multi Band",
                    enabled: true,
                    encryption: "WPA2",
                    password: "TestGuestPass",
                },
                hidden: false,
                htmode: "VHT80",
                band: "5g",
                id: 0,
                password: "TestPass",
                encryption: "WPA2/3",
            },
        ],
    };
}

// Several devices where the last one is delivered by the API already on the
// 6 GHz band, but with an encryption the band doesn't support.
export function multiDevice6GHzSettingsFixture() {
    const devices = wifiSettingsFixture().devices.map((device) => ({
        ...device,
        enabled: true,
        guest_wifi: { encryption: "WPA2", ...device.guest_wifi },
    }));
    const last = multiBandSettingsFixture().devices[0];
    last.id = devices.length;
    last.band = "6g";
    last.htmode = "VHT160";
    last.channel = 1;
    last.encryption = "WPA2/3";
    last.guest_wifi.encryption = "WPA2";
    return { devices: [...devices, last] };
}

const oneDevice = {
    devices: [
        {
            SSID: "Turris1",
            channel: 60,
            enabled: true,
            guest_wifi: { enabled: false },
            hidden: false,
            htmode: "HT40",
            band: "5g",
            id: 0,
            password: "TestPass",
            encryption: "WPA3",
        },
    ],
};

const twoDevices = {
    devices: [
        {
            SSID: "",
            channel: 60,
            enabled: true,
            guest_wifi: { enabled: false },
            hidden: false,
            htmode: "HT40",
            band: "5g",
            id: 0,
            password: "TestPass",
            encryption: "WPA3",
        },
        {
            SSID: "Turris2",
            channel: 60,
            enabled: true,
            guest_wifi: { enabled: false },
            hidden: false,
            htmode: "HT40",
            band: "5g",
            id: 1,
            password: "TestPass",
            encryption: "WPA3",
        },
    ],
};

const threeDevices = {
    devices: [
        {
            SSID: "Turris1",
            channel: 60,
            enabled: true,
            guest_wifi: { enabled: false },
            hidden: false,
            htmode: "HT40",
            band: "5g",
            id: 0,
            password: "TestPass",
            encryption: "WPA3",
        },
        {
            SSID: "Turris2",
            channel: 60,
            enabled: false,
            guest_wifi: { enabled: false },
            hidden: false,
            htmode: "HT40",
            band: "5g",
            id: 1,
            password: "TestPass",
            encryption: "WPA3",
        },
        {
            SSID: "Turris3",
            channel: 60,
            enabled: true,
            guest_wifi: { enabled: false },
            hidden: false,
            htmode: "HT40",
            band: "5g",
            id: 2,
            password: "",
            encryption: "WPA3",
        },
    ],
};

export { oneDevice, twoDevices, threeDevices };
