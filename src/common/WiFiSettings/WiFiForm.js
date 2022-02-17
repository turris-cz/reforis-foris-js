/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { Switch } from "../../bootstrap/Switch";
import { CheckBox } from "../../bootstrap/CheckBox";
import { PasswordInput } from "../../bootstrap/PasswordInput";
import { RadioSet } from "../../bootstrap/RadioSet";
import { Select } from "../../bootstrap/Select";
import { TextInput } from "../../bootstrap/TextInput";
import WiFiQRCode from "./WiFiQRCode";
import WifiGuestForm from "./WiFiGuestForm";
import { HELP_TEXTS, HTMODES, HWMODES, ENCRYPTIONMODES } from "./constants";

WiFiForm.propTypes = {
    formData: PropTypes.shape({ devices: PropTypes.arrayOf(PropTypes.object) })
        .isRequired,
    formErrors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    setFormValue: PropTypes.func.isRequired,
    hasGuestNetwork: PropTypes.bool,
};

WiFiForm.defaultProps = {
    formData: { devices: [] },
    setFormValue: () => {},
    hasGuestNetwork: true,
};

export default function WiFiForm({
    formData,
    formErrors,
    setFormValue,
    hasGuestNetwork,
    disabled,
}) {
    return formData.devices.map((device, index) => (
        <DeviceForm
            key={device.id}
            formData={device}
            deviceIndex={index}
            formErrors={(formErrors || [])[index]}
            setFormValue={setFormValue}
            hasGuestNetwork={hasGuestNetwork}
            disabled={disabled}
            divider={index + 1 !== formData.devices.length}
        />
    ));
}

DeviceForm.propTypes = {
    formData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        enabled: PropTypes.bool.isRequired,
        SSID: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        hidden: PropTypes.bool.isRequired,
        hwmode: PropTypes.string.isRequired,
        htmode: PropTypes.string.isRequired,
        channel: PropTypes.string.isRequired,
        guest_wifi: PropTypes.object.isRequired,
        encryption: PropTypes.string.isRequired,
    }),
    formErrors: PropTypes.object.isRequired,
    setFormValue: PropTypes.func.isRequired,
    hasGuestNetwork: PropTypes.bool,
    deviceIndex: PropTypes.number,
    divider: PropTypes.bool,
};

DeviceForm.defaultProps = {
    formErrors: {},
    hasGuestNetwork: true,
};

function DeviceForm({
    formData,
    formErrors,
    setFormValue,
    hasGuestNetwork,
    deviceIndex,
    divider,
    ...props
}) {
    const deviceID = formData.id;
    return (
        <>
            <Switch
                label={<h2>{_(`Wi-Fi ${deviceID + 1}`)}</h2>}
                checked={formData.enabled}
                onChange={setFormValue((value) => ({
                    devices: {
                        [deviceIndex]: { enabled: { $set: value } },
                    },
                }))}
                switchHeading
                {...props}
            />
            {formData.enabled ? (
                <>
                    <TextInput
                        label="SSID"
                        value={formData.SSID}
                        error={formErrors.SSID || null}
                        helpText={HELP_TEXTS.ssid}
                        required
                        onChange={setFormValue((value) => ({
                            devices: {
                                [deviceIndex]: {
                                    SSID: { $set: value },
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
                        error={formErrors.password}
                        helpText={HELP_TEXTS.password}
                        required
                        onChange={setFormValue((value) => ({
                            devices: {
                                [deviceIndex]: { password: { $set: value } },
                            },
                        }))}
                        {...props}
                    />

                    <CheckBox
                        label={_("Hide SSID")}
                        helpText={HELP_TEXTS.hidden}
                        checked={formData.hidden}
                        onChange={setFormValue((value) => ({
                            devices: {
                                [deviceIndex]: { hidden: { $set: value } },
                            },
                        }))}
                        {...props}
                    />

                    <RadioSet
                        name={`hwmode-${deviceID}`}
                        label="GHz"
                        choices={getHwmodeChoices(formData)}
                        value={formData.hwmode}
                        helpText={HELP_TEXTS.hwmode}
                        inline
                        onChange={setFormValue((value) => ({
                            devices: {
                                [deviceIndex]: {
                                    hwmode: { $set: value },
                                    channel: { $set: "0" },
                                    htmode: {
                                        $set:
                                            value === "11a" ? "VHT80" : "HT20",
                                    },
                                },
                            },
                        }))}
                        {...props}
                    />

                    <Select
                        label={_("802.11n/ac mode")}
                        choices={getHtmodeChoices(formData)}
                        value={formData.htmode}
                        helpText={HELP_TEXTS.htmode}
                        onChange={setFormValue((value) => ({
                            devices: {
                                [deviceIndex]: { htmode: { $set: value } },
                            },
                        }))}
                        {...props}
                    />

                    <Select
                        label={_("Channel")}
                        choices={getChannelChoices(formData)}
                        value={formData.channel}
                        onChange={setFormValue((value) => ({
                            devices: {
                                [deviceIndex]: { channel: { $set: value } },
                            },
                        }))}
                        {...props}
                    />

                    <Select
                        label={_("Encryption")}
                        choices={getEncryptionChoices(formData)}
                        helpText={HELP_TEXTS.wpa3}
                        value={formData.encryption}
                        onChange={setFormValue((value) => ({
                            devices: {
                                [deviceIndex]: { encryption: { $set: value } },
                            },
                        }))}
                        {...props}
                    />

                    {hasGuestNetwork && (
                        <WifiGuestForm
                            formData={{
                                id: deviceIndex,
                                ...formData.guest_wifi,
                            }}
                            formErrors={formErrors.guest_wifi || {}}
                            setFormValue={setFormValue}
                            {...props}
                        />
                    )}
                </>
            ) : null}
            {divider ? <hr /> : null}
        </>
    );
}

function getChannelChoices(device) {
    const channelChoices = {
        0: _("auto"),
    };

    device.available_bands.forEach((availableBand) => {
        if (availableBand.hwmode !== device.hwmode) return;

        availableBand.available_channels.forEach((availableChannel) => {
            channelChoices[availableChannel.number.toString()] = `
                        ${availableChannel.number}
                        (${availableChannel.frequency} MHz ${
                availableChannel.radar ? " ,DFS" : ""
            })
                    `;
        });
    });

    return channelChoices;
}

function getHtmodeChoices(device) {
    const htmodeChoices = {};

    device.available_bands.forEach((availableBand) => {
        if (availableBand.hwmode !== device.hwmode) return;

        availableBand.available_htmodes.forEach((availableHtmod) => {
            htmodeChoices[availableHtmod] = HTMODES[availableHtmod];
        });
    });
    return htmodeChoices;
}

function getHwmodeChoices(device) {
    return device.available_bands.map((availableBand) => ({
        label: HWMODES[availableBand.hwmode],
        value: availableBand.hwmode,
    }));
}

function getEncryptionChoices(device) {
    if (device.encryption === "custom") {
        ENCRYPTIONMODES.custom = _("Custom");
    }
    return ENCRYPTIONMODES;
}
