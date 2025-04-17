/*
 * Copyright (C) 2019-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import Button from "../../bootstrap/Button";

export const STATES = {
    READY: 1,
    SAVING: 2,
    LOAD: 3,
};

SubmitButton.propTypes = {
    /** Disable button */
    disabled: PropTypes.bool,
    /** Button state */
    state: PropTypes.oneOf(Object.keys(STATES).map((key) => STATES[key])),
    /** Button label */
    label: PropTypes.string,
};

export function SubmitButton({ disabled, state, label, ...props }) {
    const disableSubmitButton = disabled || state !== STATES.READY;
    const loadingSubmitButton = state !== STATES.READY;

    let labelSubmitButton = label;
    if (!labelSubmitButton) {
        switch (state) {
            case STATES.SAVING:
                labelSubmitButton = _("Updating");
                break;
            case STATES.LOAD:
                labelSubmitButton = _("Loading");
                break;
            default:
                labelSubmitButton = _("Save");
        }
    }

    return (
        <Button
            type="submit"
            loading={loadingSubmitButton}
            disabled={disableSubmitButton}
            forisFormSize
            {...props}
        >
            {labelSubmitButton}
        </Button>
    );
}
