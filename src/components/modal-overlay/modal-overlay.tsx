import React, { FC } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = (props) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={props.onClose} data-test-id="modal-overlay">
        </div>
    )
}

export default ModalOverlay;
