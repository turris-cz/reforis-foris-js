/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

Button.propTypes = {
    /** Additional class name. */
    className: PropTypes.string,
    /** Use foris form size and offset. */
    forisFormSize: PropTypes.bool,
    /** Show loading icon. */
    loading: PropTypes.bool,
    /** Button content. */
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export function Button({
    className,
    loading,
    forisFormSize,
    children,
    ...props
}) {
    let buttonClass = className ? `btn ${className}` : "btn btn-primary";
    if (forisFormSize) {
        buttonClass = `${buttonClass} col-sm-12 col-md-3 col-lg-2`;
    }

    return (
        <button
            type="button"
            className={`${buttonClass} d-inline-flex justify-content-center align-items-center`}
            {...props}
        >
            {loading && (
                <span
                    className="spinner-border spinner-border-sm mr-1"
                    role="status"
                    aria-hidden="true"
                />
            )}
            <span>{children}</span>
        </button>
    );
}
