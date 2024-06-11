/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

DownloadButton.propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

DownloadButton.defaultProps = {
    className: "btn-primary",
};

function DownloadButton({ href, className, children, ...props }) {
    return (
        <a
            href={href}
            className={`btn ${className}`.trim()}
            {...props}
            download
        >
            {children}
        </a>
    );
}

export default DownloadButton;
