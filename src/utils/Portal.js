/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import ReactDOM from "react-dom";

export function Portal({ containerId, children }) {
    const container = document.getElementById(containerId);
    if (container) return ReactDOM.createPortal(children, container);
    return null;
}
