/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import propTypes from "prop-types";

RichTableBody.propTypes = {
    table: propTypes.shape({
        getRowModel: propTypes.func.isRequired,
    }).isRequired,
    flexRender: propTypes.func.isRequired,
};

function RichTableBody({ table, flexRender }) {
    return (
        <tbody>
            {table.getRowModel().rows.map((row) => {
                return (
                    <tr key={row.id} className="align-middle">
                        {row.getVisibleCells().map((cell) => {
                            return (
                                <td
                                    key={cell.id}
                                    {...(cell.column.columnDef.className && {
                                        className:
                                            cell.column.columnDef.className,
                                    })}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}

export default RichTableBody;
