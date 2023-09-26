import { BUTTON } from 'models/Interface';
import Project from 'models/Project';

import ButtonIcon from 'components/General/ButtonIcon/ButtonIcon';

import editIcon from "images/buttons/edit.svg";
import removeIcon from "images/buttons/remove.svg";

import "components/Project/ProjectNote/ProjectNote.scss"

interface ProjectNoteProps {
    project: Project;
}

export default function ProjectNote({ project }: ProjectNoteProps) {
    function handlerOpenPageProject() {
        // 
    }

    function handlerRemoveProject() {
        //
    }

    return <div className="project-wrapper">
        <span>
            <ButtonIcon iconSVG={editIcon} caption={BUTTON.edit} onClick={handlerOpenPageProject} />
            <p>{project.title}</p>
        </span>
        <span>
            <ButtonIcon iconSVG={removeIcon} caption={BUTTON.delete} onClick={handlerRemoveProject} />
        </span>
    </div>
}