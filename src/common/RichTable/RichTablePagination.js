/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useMemo } from "react";

import {
    faAngleLeft,
    faAnglesLeft,
    faAngleRight,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";

RichTablePagination.propTypes = {
    table: propTypes.shape({
        getState: propTypes.func.isRequired,
        getCanPreviousPage: propTypes.func.isRequired,
        getCanNextPage: propTypes.func.isRequired,
        firstPage: propTypes.func.isRequired,
        previousPage: propTypes.func.isRequired,
        nextPage: propTypes.func.isRequired,
        lastPage: propTypes.func.isRequired,
        setPageSize: propTypes.func.isRequired,
        getPageCount: propTypes.func.isRequired,
    }).isRequired,
    tablePageSize: propTypes.number,
    allRows: propTypes.number,
};

function RichTablePagination({ table, tablePageSize, allRows }) {
    const { pagination } = table.getState();
    const prevPagBtnDisabled = !table.getCanPreviousPage();
    const nextPagBtnDisabled = !table.getCanNextPage();

    const pageSizes = useMemo(() => {
        return [tablePageSize ?? 5, 10, 25].filter(
            (value, index, self) => self.indexOf(value) === index
        );
    }, [tablePageSize]);

    const renderPaginationButton = (icon, ariaLabel, onClick, disabled) => (
        <li
            className={`page-item ${disabled ? "disabled" : ""}`}
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
            <button
                type="button"
                className="page-link"
                aria-label={ariaLabel}
                onClick={onClick}
                disabled={disabled}
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        </li>
    );

    return (
        <nav
            aria-label={_("Pagination navigation bar")}
            className="d-flex gap-2 justify-content-start align-items-center mx-2 mb-1 text-nowrap"
        >
            <ul className="pagination pagination-sm mb-0">
                {renderPaginationButton(
                    faAnglesLeft,
                    _("First page"),
                    () => table.firstPage(),
                    prevPagBtnDisabled
                )}
                {renderPaginationButton(
                    faAngleLeft,
                    _("Previous page"),
                    () => table.previousPage(),
                    prevPagBtnDisabled
                )}
                {renderPaginationButton(
                    faAngleRight,
                    _("Next page"),
                    () => table.nextPage(),
                    nextPagBtnDisabled
                )}
                {renderPaginationButton(
                    faAnglesRight,
                    _("Last page"),
                    () => table.lastPage(),
                    nextPagBtnDisabled
                )}
            </ul>
            <span>
                {_("Page")}&nbsp;
                <span className="fw-bold">
                    {pagination.pageIndex + 1}
                    &nbsp;{_("of")}&nbsp;
                    {table.getPageCount().toLocaleString()}
                </span>
            </span>
            <div
                className="vr mx-1 align-self-center"
                style={{ height: "1.5rem" }}
            />
            <span>{_("Rows per page:")}</span>
            <select
                className="form-select form-select-sm w-auto"
                aria-label={_("Select rows per page")}
                value={pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                }}
            >
                {pageSizes.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                ))}
                <option key={allRows} value={allRows}>
                    {_("All")}
                </option>
            </select>
        </nav>
    );
}

export default RichTablePagination;
