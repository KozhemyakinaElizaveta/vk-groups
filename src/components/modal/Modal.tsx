import styles from './Modal.module.css';
import {PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from './ModalOverlay';
import CloseIcon from '@mui/icons-material/Close';

const modalRoot = document.getElementById("portal-root") as Element;

interface ModalProps {
    onClose: () => void;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ children, onClose}) => {
    const ESC_KEYCODE = 27;

    const closeModal = () => {
        onClose();
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.keyCode === ESC_KEYCODE && onClose()
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick ={closeModal}/>
            <div className={styles.modal_container}>
                <div className={styles.modal_content}>
                    <div className={styles.button}>
                        <h2 className={styles.text}>Friends</h2>
                        <div className={styles.icon}>
                            <CloseIcon sx={{ color: '#fff' }} fontSize="large" onClick={onClose}/>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
        );
};

export default Modal;