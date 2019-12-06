/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Spinner } from "bootstrap/Spinner";
import { useAPIPost } from "api/hooks";

import { Prompt } from "react-router";
import { API_STATE } from "api/utils";
import { ErrorMessage } from "utils/ErrorMessage";
import { useAlert } from "alertContext/AlertContext";
import { ALERT_TYPES } from "bootstrap/Alert";
import { useForisModule, useForm } from "../hooks";
import { STATES as SUBMIT_BUTTON_STATES, SubmitButton } from "./SubmitButton";

ForisForm.propTypes = {
    /** WebSocket object see `scr/common/WebSockets.js`. */
    ws: PropTypes.object,
    /** Foris configuration object. See usage in main components. */
    forisConfig: PropTypes.shape({
        /** reForis Flask aplication API endpoint from `src/common/API.js`. */
        endpoint: PropTypes.string.isRequired,
        /** `foris-controller` module name to be used via WebSockets.
         *  If it's not passed then WebSockets aren't used
         * */
        wsModule: PropTypes.string,
        /** `foris-controller` action name to be used via WebSockets.
         *  If it's not passed then `update_settings` is used. see `src/common/WebSocketHooks.js`
         * */
        wsAction: PropTypes.string,
    }).isRequired,
    /** Function to prepare data recived from the API before using in forms. */
    prepData: PropTypes.func.isRequired,
    /** Function to prepare data from form before submitting. */
    prepDataToSubmit: PropTypes.func.isRequired,
    /** Function to handle response to POST request. */
    postCallback: PropTypes.func.isRequired,
    /** Validate data and provide validation object. Then validation errors passed to children. */
    validator: PropTypes.func.isRequired,
    /** Disables form */
    disabled: PropTypes.bool,
    /** reForis form components. */
    children: PropTypes.node.isRequired,
    /** Optional override of form submit callback */
    onSubmitOverridden: PropTypes.func,
};

ForisForm.defaultProps = {
    prepData: (data) => data,
    prepDataToSubmit: (data) => data,
    postCallback: () => undefined,
    validator: () => undefined,
    disabled: false,
};

/** Serves as HOC for all foris forms components. */
export function ForisForm({
    ws,
    forisConfig,
    prepData,
    prepDataToSubmit,
    postCallback,
    validator,
    disabled,
    onSubmitOverridden,
    children,
}) {
    const [formState, onFormChangeHandler, resetFormData] = useForm(validator, prepData);
    const [setAlert] = useAlert();

    const [forisModuleState] = useForisModule(ws, forisConfig);
    useEffect(() => {
        if (forisModuleState.state === API_STATE.SUCCESS) {
            resetFormData(forisModuleState.data);
        }
    }, [forisModuleState, resetFormData, prepData]);

    const [postState, post] = useAPIPost(forisConfig.endpoint);
    useEffect(() => {
        if (postState.state === API_STATE.SUCCESS) {
            postCallback();
            setAlert(_("Settings saved successfully"), ALERT_TYPES.SUCCESS);
        } else if (postState.state === API_STATE.ERROR) {
            setAlert(postState.data);
        }
    }, [postCallback, postState.state, postState.data, setAlert]);

    if (forisModuleState.state === API_STATE.ERROR) {
        return <ErrorMessage />;
    }
    if (!formState.data) {
        return <Spinner />;
    }

    function onSubmitHandler(event) {
        event.preventDefault();
        resetFormData();
        const copiedFormData = JSON.parse(JSON.stringify(formState.data));
        const preparedData = prepDataToSubmit(copiedFormData);
        post({ data: preparedData });
    }

    function getSubmitButtonState() {
        if (postState.state === API_STATE.SENDING) {
            return SUBMIT_BUTTON_STATES.SAVING;
        }
        if (forisModuleState.state === API_STATE.SENDING) {
            return SUBMIT_BUTTON_STATES.LOAD;
        }
        return SUBMIT_BUTTON_STATES.READY;
    }

    const formIsDisabled = (disabled
        || forisModuleState.state === API_STATE.SENDING
        || postState.state === API_STATE.SENDING);
    const submitButtonIsDisabled = disabled || !!formState.errors;

    const childrenWithFormProps = React.Children.map(
        children,
        (child) => React.cloneElement(child, {
            formData: formState.data,
            formErrors: formState.errors,
            setFormValue: onFormChangeHandler,
            disabled: formIsDisabled,
        }),
    );

    const onSubmit = onSubmitOverridden
        ? onSubmitOverridden(formState.data, onFormChangeHandler, onSubmitHandler)
        : onSubmitHandler;

    function getMessageOnLeavingPage() {
        if (JSON.stringify(formState.data) === JSON.stringify(formState.initialData)) return true;
        return _("Changes you made may not be saved. Are you sure you want to leave?");
    }

    return (
        <>
            <Prompt message={getMessageOnLeavingPage} />
            <form onSubmit={onSubmit}>
                {childrenWithFormProps}
                <SubmitButton
                    state={getSubmitButtonState()}
                    disabled={submitButtonIsDisabled}
                />
            </form>
        </>
    );
}
