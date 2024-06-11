/*
 * Copyright (c) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";
import { useUID } from "react-uid";

Switch.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    helpText: PropTypes.string,
    switchHeading: PropTypes.bool,
};

function Switch({ label, helpText, switchHeading, ...props }) {
    const uid = useUID();

    return (
        <div
            className={`form-check form-switch mb-3 ${
                switchHeading ? "d-flex align-items-center" : null
            }`.trim()}
        >
            <input
                type="checkbox"
                className={`form-check-input ${switchHeading ? "me-2" : ""}`.trim()}
                role="switch"
                id={uid}
                {...props}
            />
            <label className="form-check-label" htmlFor={uid}>
                {label}
            </label>
            {helpText && (
                <div className="form-text">
                    <small>{helpText}</small>
                </div>
            )}
        </div>
    );
}

export default Switch;
