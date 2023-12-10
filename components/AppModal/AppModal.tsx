import { FC, ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from './AppModal.module.css'



type Props = {
    children: ReactNode;
    isOpen: boolean;
    handleClose: () => void
}

const AppModal: FC<Props> = ({
    children,
    isOpen,
    handleClose
}) => {
    return (
        <Modal open={isOpen} onClose={handleClose}>
            <div className={styles.modal}>
                {children}
                <div className={styles.closeButton}>
                    <Button aria-label="close" size="large" onClick={handleClose} startIcon={<CloseIcon />}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export { AppModal }; 