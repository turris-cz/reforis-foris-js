/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import { useConditionalTimeout } from "../utils/hooks";
import { Input } from "./Input";
import "./NumberInput.css";

NumberInput.propTypes = {
    /** Field label. */
    label: PropTypes.string.isRequired,
    /** Error message. */
    error: PropTypes.string,
    /** Help text message. */
    helpText: PropTypes.string,
    /** Number value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Function called when value changes. */
    onChange: PropTypes.func.isRequired,
    /** Additional description dispaled to the right of input value. */
    inlineText: PropTypes.string,
};

NumberInput.defaultProps = {
    value: 0,
};

export function NumberInput({ onChange, inlineText, value, ...props }) {
    function updateValue(initialValue, difference) {
        onChange({ target: { value: initialValue + difference } });
    }

    const enableIncrease = useConditionalTimeout(
        { callback: updateValue },
        value,
        1
    );
    const enableDecrease = useConditionalTimeout(
        { callback: updateValue },
        value,
        -1
    );

    return (
        <Input type="number" onChange={onChange} value={value} {...props}>
            <div className="input-group-append">
                {inlineText && <p className="input-group-text">{inlineText}</p>}
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onMouseDown={() => enableIncrease(true)}
                    onMouseUp={() => enableIncrease(false)}
                    aria-label="Increase"
                >
                    <i className="fas fa-plus" />
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onMouseDown={() => enableDecrease(true)}
                    onMouseUp={() => enableDecrease(false)}
                    aria-label="Decrease"
                >
                    <i className="fas fa-minus" />
                </button>
            </div>
        </Input>
    );
}
