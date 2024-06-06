/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";
import { useUID } from "react-uid";

Select.propTypes = {
    /** Select field Label. */
    label: PropTypes.string.isRequired,
    /** Choices if form of {value : "Label",...}. */
    choices: PropTypes.object.isRequired,
    /** Current value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Help text message. */
    helpText: PropTypes.string,
};

function Select({ label, choices, helpText, ...props }) {
    const uid = useUID();

    const options = Object.keys(choices).map((choice) => (
        <option key={choice} value={choice}>
            {choices[choice]}
        </option>
    ));

    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={uid}>
                {label}
            </label>
            <select className="form-select" id={uid} {...props}>
                {options}
            </select>
            {helpText && (
                <div className="form-text">
                    <small>{helpText}</small>
                </div>
            )}
        </div>
    );
}

export default Select;
