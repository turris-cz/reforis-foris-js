/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { forwardRef } from "react";

import PropTypes from "prop-types";
import { useUID } from "react-uid";

/** Base bootstrap input component. */
const Input = forwardRef(
    (
        {
            type,
            label,
            helpText,
            error,
            className,
            children,
            labelClassName,
            groupClassName,
            ...props
        },
        ref
    ) => {
        const uid = useUID();

        const inputClassName = `${className || ""} ${
            error ? "is-invalid" : ""
        }`.trim();

        return (
            <div className="mb-3">
                <label
                    className={`form-label ${labelClassName || ""}`.trim()}
                    htmlFor={uid}
                >
                    {label}
                </label>
                <div className={`input-group ${groupClassName || ""}`.trim()}>
                    <input
                        className={`form-control ${inputClassName}`.trim()}
                        type={type}
                        id={uid}
                        ref={ref}
                        {...props}
                    />
                    {children}
                </div>
                {error && <div className="invalid-feedback">{error}</div>}
                {helpText && (
                    <div className="form-text">
                        <small>{helpText}</small>
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

Input.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    labelClassName: PropTypes.string,
    groupClassName: PropTypes.string,
};

export default Input;
