/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Input } from "./Input";

CopyInput.propTypes = {
    /** Field label. */
    label: PropTypes.string.isRequired,
    /** Field value. */
    value: PropTypes.string,
    /** Help text message. */
    helpText: PropTypes.string,
    /** Disable input field */
    disabled: PropTypes.bool,
    /** Readonly input field */
    readOnly: PropTypes.bool,
};

export function CopyInput({ value, ...props }) {
    const inputTextRef = useRef();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        // Clipboard API works only in a secure (HTTPS) context.
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(value);
        } else {
            // Fallback to the "classic" copy to clipboard implementation.
            inputTextRef.current.focus();
            inputTextRef.current.select();
            document.execCommand("copy");
            inputTextRef.current.blur();
        }

        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <Input type="text" value={value} ref={inputTextRef} {...props}>
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleCopyClick}
                >
                    <span>{isCopied ? _("Copied!") : _("Copy")}</span>
                </button>
            </div>
        </Input>
    );
}
