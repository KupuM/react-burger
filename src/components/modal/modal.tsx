import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MODAL_ROOT } from "../../utils/constants";

interface IModalProps {
    onClose: () => void;
    children: JSX.Element | string;
}

const Modal: FC<IModalProps> = ({onClose, children}) => {

    const handlePressEscape = (e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent): void => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handlePressEscape);

        return () => document.removeEventListener("keydown", handlePressEscape);
    });

    return MODAL_ROOT ? createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={`${modalStyles.modal} p-10`} onKeyDown={handlePressEscape} data-test-id="modal-window">
                <div className={modalStyles.close} data-test-id="close-button"><CloseIcon onClick={onClose} type="primary" /></div>
                {children}
            </div>
        </>,
        MODAL_ROOT
    ) : null;
};

export default Modal;
