/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Button } from "../../bootstrap/Button";
import { useAlert } from "../../alertContext/AlertContext";
import { ALERT_TYPES } from "../../bootstrap/Alert";
import { useAPIPost } from "../../api/hooks";
import { API_STATE } from "../../api/utils";
import { formFieldsSize } from "../../bootstrap/constants";

ResetWiFiSettings.propTypes = {
    ws: PropTypes.object.isRequired,
    endpoint: PropTypes.string.isRequired,
};

export default function ResetWiFiSettings({ ws, endpoint }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const module = "wifi";
        ws.subscribe(module)
            .bind(module, "reset", () => {
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
            setAlert(_("Wi-Fi settings are set to defaults."), ALERT_TYPES.SUCCESS);
        }
    }, [postResetResponse, setAlert]);

    function onReset() {
        dismissAlert();
        setIsLoading(true);
        postReset();
    }

    return (
        <>
            <h4>{_("Reset Wi-Fi Settings")}</h4>
            <p>
                {_(`
If a number of wireless cards doesn't match, you may try to reset the Wi-Fi settings. Note that this will remove the
current Wi-Fi configuration and restore the default values.
        `)}
            </p>
            <div className={`${formFieldsSize} text-right`}>
                <Button
                    className="btn-warning"
                    forisFormSize
                    loading={isLoading}
                    disabled={isLoading}

                    onClick={onReset}
                >
                    {_("Reset Wi-Fi Settings")}
                </Button>
            </div>
        </>
    );
}
