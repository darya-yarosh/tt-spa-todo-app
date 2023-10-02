import styles from "components/General/Modal/Modal.module.scss";

interface ModalProps {
    handleDismiss: () => void,
    children?: React.ReactNode,
}

export default function Modal({
    handleDismiss,
    children,
}: ModalProps) {
    return <div className={styles.wrapper}>
        <div className={styles.backdrop} onClick={handleDismiss} />
        <div className={styles.drawer}>
            <span className={styles.content}>{children}</span>
        </div>
    </div>
}
