/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import { TextInput } from "../../bootstrap/TextInput";
import { Switch } from "../../bootstrap/Switch";
import { PasswordInput } from "../../bootstrap/PasswordInput";
import WiFiQRCode from "./WiFiQRCode";
import { HELP_TEXTS } from "./constants";

WifiGuestForm.propTypes = {
    formData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        SSID: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
    }),
    formErrors: PropTypes.shape({
        SSID: PropTypes.string,
        password: PropTypes.string,
    }),
    setFormValue: PropTypes.func.isRequired,
    deviceIndex: PropTypes.string,
};

export default function WifiGuestForm({
    formData,
    formErrors,
    setFormValue,
    deviceIndex,
    ...props
}) {
    return (
        <>
            <Switch
                label={_("Enable Guest Wi-Fi")}
                checked={formData.enabled}
                helpText={HELP_TEXTS.guest_wifi_enabled}
                onChange={setFormValue((value) => ({
                    devices: {
                        [formData.id]: {
                            guest_wifi: { enabled: { $set: value } },
                        },
                    },
                }))}
                {...props}
            />
            {formData.enabled ? (
                <>
                    <TextInput
                        label="SSID"
                        value={formData.SSID}
                        error={formErrors.SSID}
                        helpText={HELP_TEXTS.ssid}
                        onChange={setFormValue((value) => ({
                            devices: {
                                [formData.id]: {
                                    guest_wifi: { SSID: { $set: value } },
                                },
                            },
                        }))}
                        {...props}
                    >
                        <div className="input-group-append">
                            <WiFiQRCode
                                SSID={formData.SSID}
                                password={formData.password}
                            />
                        </div>
                    </TextInput>

                    <PasswordInput
                        withEye
                        label={_("Password")}
                        value={formData.password}
                        helpText={HELP_TEXTS.password}
                        error={formErrors.password}
                        required
                        onChange={setFormValue((value) => ({
                            devices: {
                                [formData.id]: {
                                    guest_wifi: { password: { $set: value } },
                                },
                            },
                        }))}
                        {...props}
                    />
                </>
            ) : null}
        </>
    );
}
