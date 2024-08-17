import React from 'react';
import "./index.css"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, onConfirm, message}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Warning</h2>
                <p>{message}</p>
                <button onClick={onClose}>Stay</button>
                <button onClick={onConfirm}>Leave</button>
            </div>
        </div>
    );
};

export default Modal;
