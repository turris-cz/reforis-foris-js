/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { useAPIPost } from "../../api/hooks";
import { API_STATE } from "../../api/utils";
import Button from "../../bootstrap/Button";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "../../bootstrap/Modal";
import { useAlert } from "../../context/alertContext/AlertContext";

ActionButtonWithModal.propTypes = {
    /** Component that triggers the action. */
    actionTrigger: PropTypes.elementType.isRequired,
    /** URL to send the action to. */
    actionUrl: PropTypes.string.isRequired,
    /** Title of the modal. */
    modalTitle: PropTypes.string.isRequired,
    /** Message of the modal. */
    modalMessage: PropTypes.string.isRequired,
    /** Text of the action button in the modal. */
    modalActionText: PropTypes.string,
    /** Props for the action button in the modal. */
    modalActionProps: PropTypes.object,
    /** Message to display on successful action. */
    successMessage: PropTypes.string,
    /** Message to display on failed action. */
    errorMessage: PropTypes.string,
};

function ActionButtonWithModal({
    actionTrigger: ActionTriggerComponent,
    actionUrl,
    modalTitle,
    modalMessage,
    modalActionText,
    modalActionProps,
    successMessage,
    errorMessage,
}) {
    const [triggered, setTriggered] = useState(false);
    const [modalShown, setModalShown] = useState(false);
    const [triggerActionStatus, triggerAction] = useAPIPost(actionUrl);

    const [setAlert] = useAlert();
    useEffect(() => {
        if (triggerActionStatus.state === API_STATE.SUCCESS) {
            setAlert(
                successMessage || _("Action successful."),
                API_STATE.SUCCESS
            );
        }
        if (triggerActionStatus.state === API_STATE.ERROR) {
            setAlert(errorMessage || _("Action failed."));
        }
    }, [triggerActionStatus, setAlert, successMessage, errorMessage]);

    const actionHandler = () => {
        setTriggered(true);
        triggerAction();
        setModalShown(false);
    };

    return (
        <>
            <ActionModal
                shown={modalShown}
                setShown={setModalShown}
                onAction={actionHandler}
                title={modalTitle}
                message={modalMessage}
                actionText={modalActionText}
                actionProps={modalActionProps}
            />
            <ActionTriggerComponent
                loading={triggered}
                disabled={triggered}
                onClick={() => setModalShown(true)}
            />
        </>
    );
}

ActionModal.propTypes = {
    shown: PropTypes.bool.isRequired,
    setShown: PropTypes.func.isRequired,
    onAction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    actionText: PropTypes.string,
    actionProps: PropTypes.object,
};

function ActionModal({
    shown,
    setShown,
    onAction,
    title,
    message,
    actionText,
    actionProps,
}) {
    return (
        <Modal shown={shown} setShown={setShown}>
            <ModalHeader setShown={setShown} title={title} />
            <ModalBody>
                <p className="mb-0">{message}</p>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="btn-secondary"
                    onClick={() => setShown(false)}
                >
                    {_("Cancel")}
                </Button>
                <Button onClick={onAction} {...actionProps}>
                    {actionText || _("Confirm")}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ActionButtonWithModal;
