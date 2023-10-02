import { useContext } from "react";

import Project from "models/Project";
import { FormOperation, PageList } from "models/Interface";

import ProjectForm from "components/Project/ProjectForm/ProjectForm";
import ProjectNote from "components/Project/ProjectNote/ProjectNote";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import plusIcon from "images/buttons/plus.svg";

import ProjectController from "logic/storage/ProjectController";

import styles from "components/Pages/ProjectListPage/ProjectListPage.module.scss";

import { ModalContext, StorageContext } from "App";

interface ProjectListProps {
    projectList: Project[];
}

export default function ProjectListPage({
    projectList
}: ProjectListProps) {
    const modal = useContext(ModalContext);
    const storageContext = useContext(StorageContext)

    function openProjectForm() {
        modal.setContent(<ProjectForm operationTitle={FormOperation.create}
            sendForm={sendFormProject}
            closeForm={modal.closeModal} />)
        modal.openModal();
    }

    async function sendFormProject(newProject: Project) {
        await ProjectController.createProject(newProject).then(storageContext.updateStorage);
    }

    async function removeProject(removeId: string) {
        await ProjectController.removeProject(removeId).then(storageContext.updateStorage);
    }

    return <div className={styles.wrapper}>
        <div className={styles.header}>
            <p className={styles.title}>{PageList.projects}</p>
            <ButtonIcon iconSVG={plusIcon} caption={"Button for adding new project."} onClick={openProjectForm} />
        </div>
        <span className={styles.line} />
        <div className={styles.content}>
            <div className={styles.projectGrid}>
                {projectList.map(project =>
                    <span key={project.id} className={styles.span}>
                        <ProjectNote key={project.id}
                            project={project}
                            removeProject={removeProject} />
                    </span>
                )}
            </div>
        </div>
    </div>
}
