/*
 * Copyright (C) 2019-2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { QRCodeSVG } from "qrcode.react";

import { createAndDownloadPdf, toQRCodeContent } from "./qrCodeHelpers";
import Button from "../../bootstrap/Button";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "../../bootstrap/Modal";

WiFiQRCode.propTypes = {
    SSID: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default function WiFiQRCode({ SSID, password }) {
    const [modal, setModal] = useState(false);

    return (
        <>
            <button
                type="button"
                className="input-group-text"
                onClick={() => setModal(true)}
            >
                <FontAwesomeIcon
                    icon="fa-solid fa-qrcode"
                    title={_("Show QR code")}
                    aria-label={_("Show QR code")}
                    className="text-secondary"
                />
            </button>
            {modal && (
                <QRCodeModal
                    setShown={setModal}
                    shown={modal}
                    SSID={SSID}
                    password={password}
                />
            )}
        </>
    );
}

QRCodeModal.propTypes = {
    SSID: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    shown: PropTypes.bool.isRequired,
    setShown: PropTypes.func.isRequired,
};

function QRCodeModal({ shown, setShown, SSID, password }) {
    return (
        <Modal setShown={setShown} shown={shown}>
            <ModalHeader setShown={setShown} title={_("Wi-Fi QR Code")} />
            <ModalBody>
                <QRCodeSVG
                    className="d-block mx-auto img-logo-black"
                    value={toQRCodeContent(SSID, password)}
                    level="M"
                    size={350}
                    marginSize={0}
                    imageSettings={{
                        src: "/reforis/static/reforis/imgs/turris.svg",
                        height: 40,
                        width: 40,
                        excavate: true,
                    }}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    className="btn-secondary"
                    onClick={() => setShown(false)}
                >
                    {_("Close")}
                </Button>
                <Button
                    className="btn-primary"
                    onClick={() => createAndDownloadPdf(SSID, password)}
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-file-download"
                        className="me-2"
                    />
                    {_("Download PDF")}
                </Button>
            </ModalFooter>
        </Modal>
    );
}
