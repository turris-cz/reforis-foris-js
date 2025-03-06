/*
 * Copyright (C) 2019-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useMemo, useState } from "react";

import { rankItem } from "@tanstack/match-sorter-utils";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";

import RichTableBody from "./RichTableBody";
import RichTableColumnsDropdown from "./RichTableColumnsDropdown";
import RichTableHeader from "./RichTableHeader";
import RichTablePagination from "./RichTablePagination";
import Input from "../../bootstrap/Input";

RichTable.propTypes = {
    /** Columns to be displayed in the table */
    columns: PropTypes.array.isRequired,
    /** Data to be displayed in the table, must be passed as a stable reference, for example, useState */
    data: PropTypes.array.isRequired,
    /** Whether to display pagination */
    withPagination: PropTypes.bool,
    /** Number of rows per page, the default is 5 */
    pageSize: PropTypes.number,
    /** Index of the current page */
    pageIndex: PropTypes.number,
};

export default function RichTable({
    columns,
    data,
    withPagination,
    pageSize = 5,
    pageIndex = 0,
}) {
    const tableColumns = useMemo(() => columns, [columns]);
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex,
        pageSize,
    });
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState({});

    const table = useReactTable({
        data,
        columns: tableColumns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        globalFilterFn: "fuzzy",
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            pagination,
            globalFilter,
            columnVisibility,
        },
    });

    const paginationIsNeeded = data.length > pageSize && withPagination;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Input
                    className="me-3"
                    type="text"
                    placeholder={_("Search…")}
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(String(e.target.value))}
                />
                <RichTableColumnsDropdown columns={table.getAllLeafColumns()} />
            </div>
            <div className="table-responsive">
                <table className="table table-hover text-nowrap">
                    <RichTableHeader table={table} flexRender={flexRender} />
                    <RichTableBody
                        table={table}
                        columns={tableColumns}
                        flexRender={flexRender}
                    />
                </table>
                {paginationIsNeeded && (
                    <RichTablePagination
                        table={table}
                        tablePageSize={pageSize}
                        allRows={data.length}
                    />
                )}
            </div>
        </div>
    );
}

function fuzzyFilter(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
}
