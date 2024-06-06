/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useContext, useCallback, useMemo } from "react";

import PropTypes from "prop-types";

import Alert, { ALERT_TYPES } from "../../bootstrap/Alert";
import Portal from "../../utils/Portal";

AlertContextProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

function AlertContextProvider({ children }) {
    const { AlertContext } = window;
    const [alert, setAlert] = useState(null);

    const setAlertWrapper = useCallback(
        (message, type = ALERT_TYPES.DANGER) => {
            setAlert({ message, type });
        },
        [setAlert]
    );

    const dismissAlert = useCallback(() => setAlert(null), [setAlert]);
    const contextValue = useMemo(
        () => [setAlertWrapper, dismissAlert],
        [setAlertWrapper, dismissAlert]
    );

    return (
        <>
            {alert && (
                <Portal containerId="alert-container">
                    <Alert type={alert.type} onDismiss={dismissAlert}>
                        {alert.message}
                    </Alert>
                </Portal>
            )}
            <AlertContext.Provider value={contextValue}>
                {children}
            </AlertContext.Provider>
        </>
    );
}

function useAlert() {
    const { AlertContext } = window;
    return useContext(AlertContext);
}

export { AlertContextProvider, useAlert };
