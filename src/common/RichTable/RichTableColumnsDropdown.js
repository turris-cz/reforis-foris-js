/*
 * Copyright (C) 2019-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { faCheck, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import Button from "../../bootstrap/Button";

RichTableColumnsDropdown.propTypes = {
    columns: PropTypes.array.isRequired,
};

function RichTableColumnsDropdown({ columns }) {
    return (
        <div className="dropdown mb-3">
            <Button
                className="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
            >
                {_("Columns")}
            </Button>
            <ul className="dropdown-menu dropdown-menu-end">
                {columns.map((column) => {
                    return (
                        <li key={column.id}>
                            <button
                                type="button"
                                className="dropdown-item d-flex align-items-center"
                                onClick={column.getToggleVisibilityHandler()}
                                style={{ paddingLeft: "2rem" }}
                                disabled={
                                    column.columnDef?.enableHiding === false
                                }
                            >
                                {column.getIsVisible() && (
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="position-absolute text-secondary me-2"
                                        style={{ left: "0.6rem" }}
                                        width="1rem"
                                    />
                                )}
                                <span>{column.columnDef.header}</span>
                            </button>
                        </li>
                    );
                })}
                {columns.some((column) => !column.getIsVisible()) && (
                    <>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <button
                                type="button"
                                className="dropdown-item d-flex align-items-center"
                                style={{ paddingLeft: "2rem" }}
                                onClick={() => {
                                    // toggleVisibility for columns that are hidden
                                    columns.forEach((column) => {
                                        if (!column.getIsVisible()) {
                                            column.toggleVisibility();
                                        }
                                    });
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faRotateLeft}
                                    className="position-absolute text-secondary me-2"
                                    width="1rem"
                                    style={{ left: "0.6rem" }}
                                />
                                {_("Reset")}
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default RichTableColumnsDropdown;
