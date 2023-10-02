import { useContext } from 'react';

import Project from 'models/Project';
import { BUTTON } from 'models/Interface';

import ButtonIcon from 'components/General/ButtonIcon/ButtonIcon';
import editIcon from "images/buttons/edit.svg";
import removeIcon from "images/buttons/remove.svg";

import styles from "components/Project/ProjectNote/ProjectNote.module.scss"

import { PageControllerContext } from 'App';

interface ProjectNoteProps {
    project: Project;
    removeProject: (projectID: string) => void;
}

export default function ProjectNote({
    project,
    removeProject
}: ProjectNoteProps) {
    const pageControllerContext = useContext(PageControllerContext)

    function handlerRemoveProject() {
        const isConfirm = window.confirm(`You want to delete project "${project.title}". Are you sure?`)

        if (isConfirm) {
            removeProject(project.id);
        }
    }

    return <div className={styles.wrapper}>
        <span className={styles.span}>
            <ButtonIcon iconSVG={editIcon} caption={BUTTON.edit} onClick={() => pageControllerContext.openProjectPage(project)} />
            <p className={styles.title}>{project.title}</p>
        </span>
        <span>
            <ButtonIcon iconSVG={removeIcon} caption={BUTTON.remove} onClick={handlerRemoveProject} />
        </span>
    </div>
}