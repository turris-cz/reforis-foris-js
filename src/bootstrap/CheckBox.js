/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";
import { useUID } from "react-uid";

CheckBox.propTypes = {
    /** Label message */
    label: PropTypes.string.isRequired,
    /** Help text message */
    helpText: PropTypes.string,
    /** Control if checkbox is clickable */
    disabled: PropTypes.bool,
    /** Additional class name */
    className: PropTypes.string,
};

CheckBox.defaultProps = {
    disabled: false,
};

function CheckBox({ label, helpText, disabled, className, ...props }) {
    const uid = useUID();

    return (
        <div className={`${className || "mb-3"} form-check`.trim()}>
            <input
                className="form-check-input"
                type="checkbox"
                id={uid}
                disabled={disabled}
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

export default CheckBox;
