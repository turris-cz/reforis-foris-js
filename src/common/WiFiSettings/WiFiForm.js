/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import { HELP_TEXTS, HTMODES, BANDS, ENCRYPTIONMODES } from "./constants";
import WifiGuestForm from "./WiFiGuestForm";
import WiFiQRCode from "./WiFiQRCode";
import PasswordInput from "../../bootstrap/PasswordInput";
import RadioSet from "../../bootstrap/RadioSet";
import Select from "../../bootstrap/Select";
import Switch from "../../bootstrap/Switch";
import TextInput from "../../bootstrap/TextInput";

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
        band: PropTypes.string.isRequired,
        htmode: PropTypes.string.isRequired,
        channel: PropTypes.string.isRequired,
        guest_wifi: PropTypes.object.isRequired,
        encryption: PropTypes.string.isRequired,
        available_bands: PropTypes.array.isRequired,
        ieee80211w_disabled: PropTypes.bool,
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
    const bnds = formData.available_bands;
    return (
        <>
            <Switch
                label={<h2 className="mb-0">{_(`Wi-Fi ${deviceID + 1}`)}</h2>}
                checked={formData.enabled}
                onChange={setFormValue((value) => ({
                    devices: {
                        [deviceIndex]: { enabled: { $set: value } },
                    },
                }))}
                switchHeading
                {...props}
            />
            {formData.enabled && (
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
                        <WiFiQRCode
                            SSID={formData.SSID}
                            password={formData.password}
                        />
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

                    <Switch
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
                        name={`band-${deviceID}`}
                        label={_("Band")}
                        choices={getBandChoices(formData)}
                        value={formData.band}
                        helpText={HELP_TEXTS.band}
                        inline
                        onChange={setFormValue((value) => {
                            // Find the selected band
                            const selectedBand = bnds.find(
                                (band) => band.band === value
                            );
                            // Get the last item in the available HT modes for the selected band
                            const bestHtmode =
                                selectedBand.available_htmodes.slice(-1)[0];
                            return {
                                devices: {
                                    [deviceIndex]: {
                                        band: { $set: value },
                                        channel: { $set: "0" },
                                        htmode: { $set: bestHtmode },
                                    },
                                },
                            };
                        })}
                        {...props}
                    />

                    <Select
                        label={_("802.11n/ac/ax mode")}
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

                    {(formData.encryption === "WPA3" ||
                        formData.encryption === "WPA2/3") && (
                        <Switch
                            label={_("Disable Management Frame Protection")}
                            helpText={_(
                                "In case you have trouble connecting to WiFi Access Point, try disabling Management Frame Protection."
                            )}
                            checked={formData.ieee80211w_disabled}
                            onChange={setFormValue((value) => ({
                                devices: {
                                    [deviceIndex]: {
                                        ieee80211w_disabled: { $set: value },
                                    },
                                },
                            }))}
                            {...props}
                        />
                    )}

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
            )}
            {divider && <hr />}
        </>
    );
}

function getChannelChoices(device) {
    const channelChoices = {
        0: _("auto"),
    };

    device.available_bands.forEach((availableBand) => {
        if (availableBand.band !== device.band) return;

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
        if (availableBand.band !== device.band) return;

        availableBand.available_htmodes.forEach((availableHtmod) => {
            htmodeChoices[availableHtmod] = HTMODES[availableHtmod];
        });
    });
    return htmodeChoices;
}

function getBandChoices(device) {
    return device.available_bands.map((availableBand) => ({
        label: `${BANDS[availableBand.band]} GHz`,
        value: availableBand.band,
    }));
}

function getEncryptionChoices(device) {
    if (device.encryption === "custom") {
        ENCRYPTIONMODES.custom = _("Custom");
    }
    return ENCRYPTIONMODES;
}
