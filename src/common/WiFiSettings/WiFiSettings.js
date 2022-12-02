/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import { ForisForm } from "../../form/components/ForisForm";
import WiFiForm from "./WiFiForm";
import { ResetWiFiSettings } from "./ResetWiFiSettings";

WiFiSettings.propTypes = {
    ws: PropTypes.object.isRequired,
    endpoint: PropTypes.string.isRequired,
    resetEndpoint: PropTypes.string.isRequired,
    hasGuestNetwork: PropTypes.bool,
};

export function WiFiSettings({ ws, endpoint, resetEndpoint, hasGuestNetwork }) {
    return (
        <>
            <ForisForm
                ws={ws}
                forisConfig={{
                    endpoint,
                    wsModule: "wifi",
                }}
                prepData={prepData}
                prepDataToSubmit={prepDataToSubmit}
                validator={validator}
            >
                <WiFiForm hasGuestNetwork={hasGuestNetwork} />
            </ForisForm>
            <ResetWiFiSettings ws={ws} endpoint={resetEndpoint} />
        </>
    );
}

function prepData(formData) {
    formData.devices.forEach((device, idx) => {
        formData.devices[idx].channel = device.channel.toString();
    });
    return formData;
}

function prepDataToSubmit(formData) {
    formData.devices.forEach((device, idx) => {
        delete device.available_bands;

        formData.devices[idx].channel = parseInt(device.channel);

        if (!device.enabled) {
            formData.devices[idx] = { id: device.id, enabled: false };
            return;
        }

        if (!device.guest_wifi.enabled)
            formData.devices[idx].guest_wifi = { enabled: false };

        if (device.encryption === "WPA2") {
            delete formData.devices[idx].ieee80211w_disabled;
        }
    });
    return formData;
}

export function byteCount(string) {
    const buffer = Buffer.from(string, "utf-8");
    const count = buffer.byteLength;
    return count;
}

export function validator(formData) {
    const formErrors = formData.devices.map((device) => {
        if (!device.enabled) return {};

        const errors = {};
        if (device.SSID.length > 32)
            errors.SSID = _("SSID can't be longer than 32 symbols");
        if (device.SSID.length === 0) errors.SSID = _("SSID can't be empty");
        if (byteCount(device.SSID) > 32)
            errors.SSID = _("SSID can't be longer than 32 bytes");

        if (device.password.length < 8)
            errors.password = _("Password must contain at least 8 symbols");
        if (device.password.length >= 64)
            errors.password = _(
                "Password must not contain more than 63 symbols"
            );

        if (!device.guest_wifi.enabled) return errors;

        const guest_wifi_errors = {};
        if (device.guest_wifi.SSID.length > 32)
            guest_wifi_errors.SSID = _("SSID can't be longer than 32 symbols");
        if (device.guest_wifi.SSID.length === 0)
            guest_wifi_errors.SSID = _("SSID can't be empty");
        if (byteCount(device.guest_wifi.SSID) > 32)
            guest_wifi_errors.SSID = _("SSID can't be longer than 32 bytes");

        if (device.guest_wifi.password.length < 8)
            guest_wifi_errors.password = _(
                "Password must contain at least 8 symbols"
            );
        if (device.guest_wifi.password.length >= 64)
            guest_wifi_errors.password = _(
                "Password must not contain more than 63 symbols"
            );

        if (guest_wifi_errors.SSID || guest_wifi_errors.password) {
            errors.guest_wifi = guest_wifi_errors;
        }
        return errors;
    });
    return JSON.stringify(formErrors).match(/\[[{},?]+\]/) ? null : formErrors;
}
