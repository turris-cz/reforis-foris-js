/*
 * Copyright (c) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
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

export function Switch({ label, helpText, switchHeading, ...props }) {
    const uid = useUID();
    return (
        <div className={`form-group ${switchHeading ? "switch" : ""}`.trim()}>
            <div
                className={`custom-control custom-switch ${
                    !helpText ? "custom-control-inline" : ""
                } ${switchHeading ? "switch-heading" : ""}`.trim()}
            >
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id={uid}
                    {...props}
                />
                <label className="custom-control-label" htmlFor={uid}>
                    {label}
                </label>
                {helpText && (
                    <small className="form-text text-muted mt-0 mb-3">
                        {helpText}
                    </small>
                )}
            </div>
        </div>
    );
}
