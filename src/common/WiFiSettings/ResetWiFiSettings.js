/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { useAPIPost } from "../../api/hooks";
import { API_STATE } from "../../api/utils";
import { ALERT_TYPES } from "../../bootstrap/Alert";
import Button from "../../bootstrap/Button";
import { formFieldsSize } from "../../bootstrap/constants";
import { useAlert } from "../../context/alertContext/AlertContext";

ResetWiFiSettings.propTypes = {
    ws: PropTypes.object.isRequired,
    endpoint: PropTypes.string.isRequired,
};

function ResetWiFiSettings({ ws, endpoint }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const module = "wifi";
        ws.subscribe(module).bind(module, "reset", () => {
            // eslint-disable-next-line no-restricted-globals
            setTimeout(() => location.reload(), 1000);
        });
    }, [ws]);

    const [postResetResponse, postReset] = useAPIPost(endpoint);
    const [setAlert, dismissAlert] = useAlert();
    useEffect(() => {
        if (postResetResponse.state === API_STATE.ERROR) {
            setAlert(_("An error occurred during resetting Wi-Fi settings."));
        } else if (postResetResponse.state === API_STATE.SUCCESS) {
            setAlert(
                _("Wi-Fi settings are set to defaults."),
                ALERT_TYPES.SUCCESS
            );
        }
    }, [postResetResponse, setAlert]);

    const onReset = () => {
        dismissAlert();
        setIsLoading(true);
        postReset();
    };

    return (
        <div className={formFieldsSize}>
            <h2>{_("Reset Wi-Fi Settings")}</h2>
            <p>
                {_(
                    "If a number of wireless cards doesn't match, you may try to reset the Wi-Fi settings. Note that this will remove the current Wi-Fi configuration and restore the default values."
                )}
            </p>
            <div className="text-end">
                <Button
                    className="btn-primary"
                    forisFormSize
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={onReset}
                >
                    {_("Reset Wi-Fi Settings")}
                </Button>
            </div>
        </div>
    );
}

export default ResetWiFiSettings;
