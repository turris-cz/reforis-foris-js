/*
 * Copyright (C) 2019-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import {
    faSquareCaretUp,
    faSquareCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";

RichTableHeader.propTypes = {
    table: propTypes.shape({
        getHeaderGroups: propTypes.func.isRequired,
    }).isRequired,
    flexRender: propTypes.func.isRequired,
};

function RichTableHeader({ table, flexRender }) {
    const getThTitle = (header) => {
        if (!header.column.getCanSort()) return undefined;

        const nextSortingOrder = header.column.getNextSortingOrder();
        if (nextSortingOrder === "asc") return _("Sort ascending");
        if (nextSortingOrder === "desc") return _("Sort descending");
        return _("Clear sort");
    };

    return (
        <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} role="row">
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            colSpan={header.colSpan}
                            {...(header.column.columnDef.headerClassName && {
                                className:
                                    header.column.columnDef.headerClassName,
                            })}
                        >
                            {header.isPlaceholder ||
                            header.column.columnDef.headerIsHidden ? (
                                <div className="d-none" aria-hidden="true">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className={`btn btn-link text-decoration-none text-reset fw-bold p-0 d-flex align-items-center
                                                    ${
                                                        header.column.getCanSort()
                                                            ? "d-flex align-items-center"
                                                            : ""
                                                    }
                                                `}
                                    onClick={header.column.getToggleSortingHandler()}
                                    title={getThTitle(header)}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {{
                                        asc: (
                                            <FontAwesomeIcon
                                                icon={faSquareCaretUp}
                                                className="ms-1 text-primary"
                                            />
                                        ),
                                        desc: (
                                            <FontAwesomeIcon
                                                icon={faSquareCaretDown}
                                                className="ms-1 text-primary"
                                            />
                                        ),
                                    }[header.column.getIsSorted()] ?? null}
                                </button>
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
}

export default RichTableHeader;
