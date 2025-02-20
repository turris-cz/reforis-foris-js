/*
 * Copyright (C) 2019-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";

import RichTableBody from "./RichTableBody";
import RichTableHeader from "./RichTableHeader";
import RichTablePagination from "./RichTablePagination";

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

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            sorting,
            pagination,
        },
    });

    const paginationIsNeeded = data.length > pageSize && withPagination;

    return (
        <div className="table-responsive">
            <table className="table table-hover text-nowrap">
                <RichTableHeader table={table} flexRender={flexRender} />
                <RichTableBody table={table} flexRender={flexRender} />
            </table>
            {paginationIsNeeded && (
                <RichTablePagination
                    table={table}
                    tablePageSize={pageSize}
                    allRows={data.length}
                />
            )}
        </div>
    );
}
