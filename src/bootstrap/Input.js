/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { forwardRef } from "react";
import { useUID } from "react-uid";
import PropTypes from "prop-types";

/** Base bootstrap input component. */
export const Input = forwardRef(
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

        const inputClassName = `form-control ${className || ""} ${
            error ? "is-invalid" : ""
        }`.trim();

        return (
            <div className="form-group">
                <label className={labelClassName} htmlFor={uid}>
                    {label}
                </label>
                <div className={`input-group ${groupClassName || ""}`.trim()}>
                    <input
                        className={inputClassName}
                        type={type}
                        id={uid}
                        ref={ref}
                        {...props}
                    />
                    {children}
                </div>
                {error ? <div className="invalid-feedback">{error}</div> : null}
                {helpText ? (
                    <small className="form-text text-muted">{helpText}</small>
                ) : null}
            </div>
        );
    }
);

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
