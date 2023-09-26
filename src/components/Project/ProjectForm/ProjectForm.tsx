import { useState } from "react";

import { BUTTON, FormOperation } from "models/Interface";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";

import returnIcon from "images/return.svg";
import confirmIcon from "images/confirm.svg";

import "components/Project/ProjectForm/ProjectForm.scss"

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

    return <form>
        <div>
            <ButtonIcon iconSVG={returnIcon} caption={BUTTON.return} onClick={closeForm} />
            <p>{operationTitle} project:</p>
        </div>
        <div>
            <label>Title:</label>
            <input type="text" placeholder="№1 Project name" value={projectTitle} onChange={(event) => setProjectTitle(event.target.value)}>{projectTitle}</input>
        </div>
        <div>
            <ButtonIcon iconSVG={confirmIcon} caption={BUTTON.save} onClick={() => sendForm(projectTitle)} />
        </div>
    </form>
}