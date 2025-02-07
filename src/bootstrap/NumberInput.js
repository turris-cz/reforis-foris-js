/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import Input from "./Input";
import { useConditionalTimeout } from "../utils/hooks";
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
    /** Additional description displayed to the right of input value. */
    inlineText: PropTypes.string,
};

NumberInput.defaultProps = {
    value: 0,
};

function NumberInput({ onChange, inlineText, value, ...props }) {
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

    function handleKeyDown(event, enableFunction) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            enableFunction(true);
        }
    }

    function handleKeyUp(event, enableFunction) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            enableFunction(false);
        }
    }

    return (
        <Input type="number" onChange={onChange} value={value} {...props}>
            {inlineText && (
                <span className="input-group-text">{inlineText}</span>
            )}
            <button
                type="button"
                className="btn btn-outline-secondary"
                onMouseDown={() => enableIncrease(true)}
                onMouseUp={() => enableIncrease(false)}
                onMouseLeave={() => enableIncrease(false)}
                onTouchStart={() => enableIncrease(true)}
                onTouchEnd={() => enableIncrease(false)}
                onTouchCancel={() => enableIncrease(false)}
                onKeyDown={(event) => handleKeyDown(event, enableIncrease)}
                onKeyUp={(event) => handleKeyUp(event, enableIncrease)}
                onBlur={() => enableIncrease(false)}
                title={_("Increase value. Hint: Hold to increase faster.")}
                aria-label={_("Increase value. Hint: Hold to increase faster.")}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onMouseDown={() => enableDecrease(true)}
                onMouseUp={() => enableDecrease(false)}
                onMouseLeave={() => enableDecrease(false)}
                onTouchStart={() => enableDecrease(true)}
                onTouchEnd={() => enableDecrease(false)}
                onTouchCancel={() => enableDecrease(false)}
                onKeyDown={(event) => handleKeyDown(event, enableDecrease)}
                onKeyUp={(event) => handleKeyUp(event, enableDecrease)}
                onBlur={() => enableDecrease(false)}
                title={_("Decrease value. Hint: Hold to decrease faster.")}
                aria-label={_("Decrease value. Hint: Hold to decrease faster.")}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </Input>
    );
}

export default NumberInput;
