/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";
import { useUID } from "react-uid";

RadioSet.propTypes = {
    /** Name attribute of the input HTML tag. */
    name: PropTypes.string.isRequired,
    /** RadioSet label . */
    label: PropTypes.string,
    /** Choices . */
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            /** Choice label . */
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element,
                PropTypes.node,
                PropTypes.arrayOf(PropTypes.node),
            ]).isRequired,
            /** Choice value . */
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
        })
    ).isRequired,
    /** Initial value . */
    value: PropTypes.string,
    /** Help text message . */
    helpText: PropTypes.string,
    inline: PropTypes.bool,
};

function RadioSet({ name, label, choices, value, helpText, inline, ...props }) {
    const uid = useUID();
    const radios = choices.map((choice, key) => {
        const id = `${name}-${key}`;
        return (
            <Radio
                id={id}
                key={id}
                name={name}
                label={choice.label}
                value={choice.value}
                helpText={choice.helpText}
                checked={choice.value === value}
                inline={inline}
                {...props}
            />
        );
    });

    return (
        <div className="mb-3">
            {label && (
                <label htmlFor={uid} className="d-block">
                    {label}
                </label>
            )}
            {radios}
            {helpText && (
                <div className="form-text">
                    <small>{helpText}</small>
                </div>
            )}
        </div>
    );
}

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
};

export function Radio({ label, id, helpText, inline, ...props }) {
    return (
        <div
            className={`mb-2 ${inline ? "form-check form-check-inline" : ""}`.trim()}
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

export default RadioSet;
