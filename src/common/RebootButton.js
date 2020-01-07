/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useAPIPost } from "../api/hooks";
import { API_STATE } from "../api/utils";
import { ForisURLs } from "../forisUrls";

import { Button } from "../bootstrap/Button";
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "../bootstrap/Modal";
import { useAlert } from "../alertContext/AlertContext";

RebootButton.propTypes = {
    forisFormSize: PropTypes.bool,
};

export function RebootButton(props) {
    const [triggered, setTriggered] = useState(false);
    const [modalShown, setModalShown] = useState(false);
    const [triggerRebootStatus, triggerReboot] = useAPIPost(ForisURLs.reboot);

    const [setAlert] = useAlert();
    useEffect(() => {
        if (triggerRebootStatus.state === API_STATE.ERROR) {
            setAlert(_("Reboot request failed."));
        }
    });

    function rebootHandler() {
        setTriggered(true);
        triggerReboot();
        setModalShown(false);
    }

    return (
        <>
            <RebootModal shown={modalShown} setShown={setModalShown} onReboot={rebootHandler} />
            <Button
                className="btn-danger"
                loading={triggered}
                disabled={triggered}
                onClick={() => setModalShown(true)}

                {...props}
            >
                {_("Reboot")}
            </Button>
        </>
    );
}

RebootModal.propTypes = {
    shown: PropTypes.bool.isRequired,
    setShown: PropTypes.func.isRequired,
    onReboot: PropTypes.func.isRequired,
};

function RebootModal({ shown, setShown, onReboot }) {
    return (
        <Modal shown={shown} setShown={setShown}>
            <ModalHeader setShown={setShown} title={_("Reboot confirmation")} />
            <ModalBody><p>{_("Are you sure you want to restart the router?")}</p></ModalBody>
            <ModalFooter>
                <Button onClick={() => setShown(false)}>{_("Cancel")}</Button>
                <Button className="btn-danger" onClick={onReboot}>{_("Confirm reboot")}</Button>
            </ModalFooter>
        </Modal>
    );
}
