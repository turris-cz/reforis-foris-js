/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import Input from "./Input";

function TextInput({ ...props }) {
    return <Input type="text" {...props} />;
}

TextInput.propTypes = {
    /** Field label. */
    label: PropTypes.string.isRequired,
    /** Error text. */
    error: PropTypes.string,
    /** Help text message. */
    helpText: PropTypes.string,
};

export default TextInput;
