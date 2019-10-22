/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";
import { Input } from "./Input";

FileInput.propTypes = {
    /** Field label. */
    label: PropTypes.string.isRequired,
    /** Error message. */
    error: PropTypes.string,
    /** Help text message. */
    helpText: PropTypes.string,
    /** Email value. */
    value: PropTypes.string,
};

export function FileInput({ ...props }) {
    return (
        <Input
            type="file"
            className="custom-file-input"
            labelClassName="custom-file-label"
            groupClassName="custom-file"
            {...props}
        />
    );
}
