/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState } from "react";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import Input from "./Input";

PasswordInput.propTypes = {
    /** Field label. */
    label: PropTypes.string.isRequired,
    /** Error message. */
    error: PropTypes.string,
    /** Password value. */
    value: PropTypes.string,
    /** Help text message. */
    helpText: PropTypes.string,
    /** Use show/hide password button. */
    withEye: PropTypes.bool,
    /** Use new-password in autocomplete attribute. */
    newPass: PropTypes.bool,
};

function PasswordInput({ withEye, newPass, ...props }) {
    const [isHidden, setHidden] = useState(true);

    return (
        <Input
            type={withEye && !isHidden ? "text" : "password"}
            autoComplete={newPass ? "new-password" : "current-password"}
            {...props}
        >
            {withEye && (
                <button
                    type="button"
                    className="input-group-text"
                    onClick={(e) => {
                        e.preventDefault();
                        setHidden((shouldBeHidden) => !shouldBeHidden);
                    }}
                >
                    <FontAwesomeIcon
                        icon={isHidden ? faEye : faEyeSlash}
                        style={{ width: "1.25rem" }}
                        className="text-secondary"
                    />
                </button>
            )}
        </Input>
    );
}

export default PasswordInput;
