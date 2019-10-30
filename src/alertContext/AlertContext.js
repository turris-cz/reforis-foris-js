/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";

import { Alert, ALERT_TYPES } from "bootstrap/Alert";

const AlertContext = React.createContext();

AlertContextProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

function AlertContextProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const setAlertWrapper = useCallback((message, type = ALERT_TYPES.DANGER) => {
        setAlert({ message, type });
    }, [setAlert]);

    const dismissAlert = useCallback(() => setAlert(null), [setAlert]);

    return (
        <>
            {alert && (
                <Alert type={alert.type} onDismiss={dismissAlert} floating>
                    {alert.message}
                </Alert>
            )}
            <AlertContext.Provider value={[setAlertWrapper, dismissAlert]}>
                { children }
            </AlertContext.Provider>
        </>
    );
}

function useAlert() {
    return useContext(AlertContext);
}

export { AlertContext, AlertContextProvider, useAlert };
