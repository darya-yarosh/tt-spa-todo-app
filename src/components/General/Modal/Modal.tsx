import { ReactNode } from "react";

import "components/General/Modal/Modal.scss";

interface ModalProps {
    handleDismiss: boolean | (() => void),
    children: ReactNode,
}

export default function Modal({
    handleDismiss,
    children,
}: ModalProps) {
    return <div className="wrapper">
        <div className="backdrop" onClick={() => handleDismiss} />
        <span className="content">{children}</span>
    </div>
}
