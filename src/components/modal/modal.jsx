import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MODAL_ROOT } from "../../utils/consts";

<<<<<<< HEAD
const Modal = ({onClose, children}) => {
=======
const Modal = (props) => {
    const { onClose, children } = props;
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102

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
<<<<<<< HEAD
=======
    title: PropTypes.string.isRequired,
>>>>>>> 4869cb788ebb085c3bb8db311816873b0f8f3102
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
