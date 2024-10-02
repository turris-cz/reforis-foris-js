/*
 * Copyright (C) 2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import Button from "./Button";

ThreeDotsMenu.propTypes = {
    /** Menu items. */
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

function ThreeDotsMenu({ children, ...props }) {
    return (
        <div className="dropdown position-static" {...props}>
            <Button
                className="btn-sm btn-link text-body"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </Button>
            <ul className="dropdown-menu">
                {children.map((child) => (
                    <li key={child.key || child.props.id || Math.random()}>
                        {child}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThreeDotsMenu;
