/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useRef, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { useFocusTrap } from "../utils/hooks";

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
    const alertRef = useRef();
    const [isVisible, setIsVisible] = useState(true);
    useFocusTrap(alertRef, !!onDismiss);

    useEffect(() => {
        if (onDismiss) {
            const timeout = setTimeout(() => setIsVisible(false), 7000);
            return () => clearTimeout(timeout);
        }
    }, [onDismiss]);

    const handleAnimationEnd = () => {
        if (!isVisible && onDismiss) {
            onDismiss();
        }
    };

    return (
        <div
            ref={alertRef}
            className={`alert alert-${type} ${isVisible ? "alert-fade-in" : "alert-slide-out-top"} ${
                onDismiss ? "alert-dismissible" : ""
            }`.trim()}
            role="alert"
            onAnimationEnd={handleAnimationEnd}
        >
            {onDismiss && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsVisible(false)}
                    aria-label={_("Close")}
                />
            )}
            {children}
        </div>
    );
}

export default Alert;
