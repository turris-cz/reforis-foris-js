/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { useUID } from "react-uid";

import { formFieldsSize } from "./constants";

CheckBox.propTypes = {
    /** Label message */
    label: PropTypes.string.isRequired,
    /** Help text message */
    helpText: PropTypes.string,
    /** Apply default size (full-width) */
    useDefaultSize: PropTypes.bool,
    /** Control if checkbox is clickable */
    disabled: PropTypes.bool,
};

CheckBox.defaultProps = {
    useDefaultSize: true,
    disabled: false,
};

export function CheckBox({
    label, helpText, useDefaultSize, disabled, ...props
}) {
    const uid = useUID();
    return (
        <div className={`form-group ${useDefaultSize ? formFieldsSize : ""}`.trim()}>
            <div className="custom-control custom-checkbox ">
                <input
                    className="custom-control-input"
                    type="checkbox"
                    id={uid}
                    disabled={disabled}

                    {...props}
                />
                <label className="custom-control-label" htmlFor={uid}>
                    {label}
                    {helpText && <small className="form-text text-muted">{helpText}</small>}
                </label>
            </div>
        </div>
    );
}
