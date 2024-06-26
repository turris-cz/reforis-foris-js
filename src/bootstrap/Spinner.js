/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import "./Spinner.css";

Spinner.propTypes = {
    /** Children components put into `div` with "spinner-text" class. */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    /** Render component with full-screen mode (using appropriate `.css` styles) */
    fullScreen: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

Spinner.defaultProps = {
    fullScreen: false,
};

export function Spinner({ fullScreen, children, className }) {
    if (!fullScreen) {
        return (
            <div
                className={`spinner-wrapper ${className || "my-3 text-center"}`}
            >
                <SpinnerElement>{children}</SpinnerElement>
            </div>
        );
    }

    return (
        <div className="spinner-fs-wrapper">
            <div className="spinner-fs-background">
                <SpinnerElement>{children}</SpinnerElement>
            </div>
        </div>
    );
}

SpinnerElement.propTypes = {
    /** Spinner's size */
    small: PropTypes.bool,
    /** Additional className */
    className: PropTypes.string,
    /** Children components */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export function SpinnerElement({ small, className, children }) {
    return (
        <>
            <div
                className={`spinner-border ${
                    small ? "spinner-border-sm" : ""
                } ${className || ""}`.trim()}
                role="status"
            >
                <span className="sr-only" />
            </div>
            {children && <div className="spinner-text">{children}</div>}
        </>
    );
}
