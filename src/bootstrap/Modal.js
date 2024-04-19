/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { Portal } from "../utils/Portal";
import { useClickOutside } from "../utils/hooks";
import "./Modal.css";

Modal.propTypes = {
    /** Is modal shown value */
    shown: PropTypes.bool.isRequired,
    /** Callback to manage modal visibility */
    setShown: PropTypes.func.isRequired,
    scrollable: PropTypes.bool,
    size: PropTypes.string,

    /** Modal content use following: `ModalHeader`, `ModalBody`, `ModalFooter` */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export function Modal({ shown, setShown, scrollable, size, children }) {
    const dialogRef = useRef();
    let modalSize = "modal-";

    useClickOutside(dialogRef, () => setShown(false));

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setShown(false);
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [setShown]);

    switch (size) {
        case "sm":
            modalSize += "sm";
            break;
        case "lg":
            modalSize += "lg";
            break;
        case "xl":
            modalSize += "xl";
            break;
        default:
            modalSize = "";
            break;
    }

    return (
        <Portal containerId="modal-container">
            <div
                className={`modal fade ${shown ? "show" : ""}`.trim()}
                role="dialog"
            >
                <div
                    ref={dialogRef}
                    className={`${modalSize.trim()} modal-dialog modal-dialog-centered ${
                        scrollable ? "modal-dialog-scrollable" : ""
                    }`.trim()}
                    role="document"
                >
                    <div className="modal-content">{children}</div>
                </div>
            </div>
        </Portal>
    );
}

ModalHeader.propTypes = {
    setShown: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export function ModalHeader({ setShown, title }) {
    return (
        <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
                type="button"
                className="btn-close"
                onClick={() => setShown(false)}
                aria-label={_("Close")}
            />
        </div>
    );
}

ModalBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export function ModalBody({ children }) {
    return <div className="modal-body">{children}</div>;
}

ModalFooter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export function ModalFooter({ children }) {
    return <div className="modal-footer">{children}</div>;
}
