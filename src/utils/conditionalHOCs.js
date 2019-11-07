/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Spinner } from "bootstrap/Spinner";
import { API_STATE } from "api/utils";
import { ErrorMessage } from "./ErrorMessage";

function withEither(conditionalFn, Either) {
    return (Component) => (props) => {
        if (conditionalFn(props)) {
            return <Either />;
        }
        return <Component {...props} />;
    };
}

// Loading

function isSending(props) {
    if (Array.isArray(props.apiState)) {
        return props.apiState.some(
            (state) => [API_STATE.INIT, API_STATE.SENDING].includes(state),
        );
    }
    return [API_STATE.INIT, API_STATE.SENDING].includes(props.apiState);
}

const withSpinner = (conditionalFn) => withEither(conditionalFn, Spinner);
const withSending = (Either) => withEither(isSending, Either);
const withSpinnerOnSending = withSpinner(isSending);

// Error handling

const withError = (conditionalFn) => withEither(conditionalFn, ErrorMessage);
const withErrorMessage = withError(
    (props) => {
        if (Array.isArray(props.apiState)) {
            return props.apiState.includes(API_STATE.ERROR);
        }
        return props.apiState === API_STATE.ERROR;
    },
);

export {
    withEither, withSpinner, withSending, withSpinnerOnSending, withError, withErrorMessage,
};
