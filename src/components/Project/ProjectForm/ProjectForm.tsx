import { useState } from "react";

import Project, { ProjectInterface, ProjectParameters, isValidProject } from "models/Project";
import { BUTTON, FormOperation } from "models/Interface";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import returnIcon from "images/buttons/return.svg";
import confirmIcon from "images/buttons/confirm.svg";

import styles from "components/Project/ProjectForm/ProjectForm.module.scss"

interface ProjectFormProps {
    project?: Project,
    operationTitle: FormOperation,
    sendForm: (newProject: Project) => void;
    closeForm: () => void;
}

export default function ProjectForm({
    project,
    operationTitle,
    sendForm,
    closeForm,
}: ProjectFormProps) {
    const [projectTitle, setProjectTitle] = useState<string>(project?.title || "");

    function handlerSendForm() {
        const newProject: Project = {
            id: project?.id || crypto.randomUUID(),
            title: projectTitle,
            tasks: project?.tasks || []
        }
        if (!isValidProject(newProject)) {
            window.alert("Project title is empty. Please write something in title.");
            return;
        }

        sendForm(newProject);
        closeForm();
    }

    return <form className={styles.wrapper}
        onSubmit={(event) => {
            event.preventDefault();
            handlerSendForm();
        }}>
        <div className={styles.header}>
            <ButtonIcon iconSVG={returnIcon} caption={BUTTON.return} onClick={closeForm} />
            <p className={styles.title}>{operationTitle} {ProjectInterface.project.toLowerCase()}:</p>
        </div>
        <span className={styles.line} />
        <div className={styles.content}>
            <span>
                <label>{ProjectParameters.title}:</label>
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