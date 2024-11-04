/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
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

import RichTableBody from "./RichTableBody";
import RichTableHeader from "./RichTableHeader";
import RichTablePagination from "./RichTablePagination";

const fallbackData = [];

const RichTable = ({
    columns,
    data,
    withPagination,
    pageSize = 5,
    pageIndex = 0,
}) {
    const tableColumns = useMemo(() => columns, [columns]);
    const [tableData] = useState(data ?? fallbackData);
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex,
        pageSize,
    });

    const table = useReactTable({
        data: tableData,
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

    return (
        <div className="table-responsive">
            <table className="table table-hover text-nowrap">
                <RichTableHeader table={table} flexRender={flexRender} />
                <RichTableBody table={table} flexRender={flexRender} />
            </table>
            {withPagination && (
                <RichTablePagination
                    table={table}
                    tablePageSize={pageSize}
                    allRows={tableData.length}
                />
            )}
        </div>
    );
};

export default RichTable;
