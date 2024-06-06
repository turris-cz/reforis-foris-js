/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import PropTypes from "prop-types";
import ReactDOM from "react-dom";

Portal.propTypes = {
    containerId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

function Portal({ containerId, children }) {
    const container = document.getElementById(containerId);
    if (container) return ReactDOM.createPortal(children, container);
    return null;
}

export default Portal;
