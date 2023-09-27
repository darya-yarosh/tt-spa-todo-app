import { useState } from "react";

import { BUTTON, FormOperation } from "models/Interface";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";

import returnIcon from "images/buttons/return.svg";
import confirmIcon from "images/buttons/confirm.svg";

import styles from "components/Project/ProjectForm/ProjectForm.module.scss"

interface ProjectFormProps {
    operationTitle: FormOperation
    sendForm: (projectTitle: string) => void;
    closeForm: () => void;
}

export default function ProjectForm({
    operationTitle,
    closeForm,
    sendForm
}: ProjectFormProps) {
    const [projectTitle, setProjectTitle] = useState<string>("");

    function isCorrectProject() {
        return projectTitle.length > 0;
    }

    function handlerSendForm() {
        if (isCorrectProject()) {
            sendForm(projectTitle);
            closeForm();
        }
        else {
            window.alert("Incorrect project name.")
        }
    }

    return <form className={styles.wrapper} 
        onSubmit={(event) => {
            event.preventDefault();
            handlerSendForm();
        }}>
        <div className={styles.header}>
            <ButtonIcon iconSVG={returnIcon} caption={BUTTON.return} onClick={closeForm} />
            <p className={styles.title}>{operationTitle} project:</p>
        </div>
        <span className={styles.line}/>
        <div className={styles.content}>
            <span className={styles.span}>
                <label className={styles.label}>Title:</label>
                <input className={styles.input_string} type="text"
                    placeholder="№1 Project name"
                    value={projectTitle}
                    onChange={(event) => setProjectTitle(event.target.value)}
                />
            </span>
        </div>
        <div className={styles.navigation}>
            <ButtonIcon iconSVG={confirmIcon} caption={BUTTON.save} onClick={handlerSendForm} />
        </div>
    </form>
}