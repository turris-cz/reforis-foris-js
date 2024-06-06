/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

export const ALERT_TYPES = Object.freeze({
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    DANGER: "danger",
    WARNING: "warning",
    INFO: "info",
    LIGHT: "light",
    DARK: "dark",
});

Alert.propTypes = {
    /** Type of the alert it adds as `alert-${type}` class. */
    type: PropTypes.oneOf(Object.values(ALERT_TYPES)),
    /** Alert content. */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    /** onDismiss handler. */
    onDismiss: PropTypes.func,
};

Alert.defaultProps = {
    type: ALERT_TYPES.DANGER,
};

function Alert({ type, onDismiss, children }) {
    return (
        <div
            className={`alert alert-${type} ${
                onDismiss ? "alert-dismissible" : ""
            }`.trim()}
        >
            {onDismiss && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={onDismiss}
                    aria-label={_("Close")}
                />
            )}
            {children}
        </div>
    );
}

export default Alert;
