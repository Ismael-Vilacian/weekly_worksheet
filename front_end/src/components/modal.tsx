import React from "react";

interface PropsModal {
    title: string;
    children?: React.ReactNode;
    funcionClose: () => void;
}

const Modal: React.FC<PropsModal> = ({ title, children, funcionClose }) => {


    return (
        <div className="back-drop-modal">
            <div className="modal">
                <div className="modal_header">
                    <div className="modal_title">{title}</div>
                    <div onClick={() => funcionClose()} className="modal-action">
                        <i className="bi bi-x-lg"></i>
                    </div>
                </div>
                <div className="modal_data">{children}</div>
            </div>
        </div>
    );
};

export default Modal;