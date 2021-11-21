import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MODAL_ROOT } from "../../utils/consts";

const Modal = ({onClose, children}) => {

    const handlePressEscape = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handlePressEscape);

        return () => document.removeEventListener("keydown", handlePressEscape);
    });

    return createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={`${modalStyles.modal} p-10`} onKeyDown={handlePressEscape}>
                <div className={modalStyles.close}><CloseIcon onClick={onClose} type="primary" /></div>
                {children}
            </div>
        </>,
        MODAL_ROOT
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
