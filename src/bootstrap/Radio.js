/*
 * Copyright (C) 2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

Radio.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    id: PropTypes.string.isRequired,
    inline: PropTypes.bool,
    helpText: PropTypes.string,
    className: PropTypes.string,
};

function Radio({ label, id, helpText, inline, className, ...props }) {
    return (
        <div
            className={`${className || "mb-3"} ${inline ? "form-check form-check-inline" : ""}`.trim()}
        >
            <input
                id={id}
                className="form-check-input me-2"
                type="radio"
                {...props}
            />
            <label className="form-check-label" htmlFor={id}>
                {label}
                {helpText && (
                    <div className="form-text">
                        <small>{helpText}</small>
                    </div>
                )}
            </label>
        </div>
    );
}

export default Radio;
