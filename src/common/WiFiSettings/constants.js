/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export const HTMODES = {
    NOHT: _("Disabled"),
    HT20: _("802.11n - 20 MHz wide channel"),
    HT40: _("802.11n - 40 MHz wide channel"),
    VHT20: _("802.11ac - 20 MHz wide channel"),
    VHT40: _("802.11ac - 40 MHz wide channel"),
    VHT80: _("802.11ac - 80 MHz wide channel"),
    VHT80_80: _("802.11ac - 80+80 MHz wide channel"),
    VHT160: _("802.11ac - 160 MHz wide channel"),
    HE20: _("802.11ax - 20 MHz wide channel"),
    HE40: _("802.11ax - 40 MHz wide channel"),
    HE80: _("802.11ax - 80 MHz wide channel"),
    HE80_80: _("802.11ax - 80+80 MHz wide channel"),
    HE160: _("802.11ax - 160 MHz wide channel"),
    EHT20: _("802.11be - 20 MHz wide channel"),
    EHT40: _("802.11be - 40 MHz wide channel"),
    EHT80: _("802.11be - 80 MHz wide channel"),
    EHT160: _("802.11be - 160 MHz wide channel"),
    EHT320: _("802.11be - 320 MHz wide channel"),
};
export const BANDS = {
    "2g": "2.4",
    "5g": "5",
    "6g": "6",
};
export const ENCRYPTIONMODES = {
    WPA3: _("WPA3 only"),
    "WPA2/3": _("WPA3 with WPA2 as fallback (default)"),
    WPA2: _("WPA2 only"),
};
export const HELP_TEXTS = {
    ssid: _(
        "SSID which contains non-standard characters could cause problems on some devices."
    ),
    password: _(
        "WPA2/3 pre-shared key, that is required to connect to the network."
    ),
    hidden: _(
        "If set, network is not visible when scanning for available networks."
    ),
    band: _(
        "The 2.4 GHz band is more widely supported by clients, but tends to have more interference. The 5 GHz band is a newer standard and may not be supported by all your devices. It usually has less interference, but the signal does not carry so well indoors. The 6 GHz band is an even newer standard and is currently supported only by a limited set of devices. As it is not widely used now, it has only very little interference."
    ),
    htmode: _(
        "Change this to adjust 802.11n/ac/ax/be mode of operation. Wider channels can yield higher throughput but can cause more interference in the network. If you don't know what to choose, use the default option."
    ),
    guest_wifi_enabled: _(
        "Enables Wi-Fi for guests, which is separated from LAN network. Devices connected to this network are allowed to access the internet, but aren't allowed to access other devices and the configuration interface of the router. Parameters of the guest network can be set in the Guest network tab."
    ),
    wpa3: _(
        "The WPA3 standard is the new most secure encryption method that is suggested to be used with any device that supports it. The older devices without WPA3 support require older WPA2. If you experience issues with connecting older devices, try to enable WPA2. The 6 GHz band supports only WPA3."
    ),
};
