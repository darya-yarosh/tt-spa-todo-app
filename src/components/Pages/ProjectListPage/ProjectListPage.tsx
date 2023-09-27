import { useContext } from "react";

import Project from "models/Project";
import { FormOperation, PageList } from "models/Interface";

import Modal from "components/General/Modal/Modal";
import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import ProjectForm from "components/Project/ProjectForm/ProjectForm";
import ProjectNote from "components/Project/ProjectNote/ProjectNote";

import useToggle from "logic/utils/use-toggle";

import plusIcon from "images/buttons/plus.svg";

import styles from "components/Pages/ProjectListPage/ProjectListPage.module.scss";

import { ProjectListContext } from "App";

export default function ProjectListPage() {
    const projectListContext = useContext(ProjectListContext);
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);

    function handlerSendFormProject(projectTitle: string) {
        const newProject: Project = {
            id: crypto.randomUUID(),
            title: projectTitle,
            tasks: []
        }

        const updatedProjects = [...projectListContext.projectList, newProject];
        projectListContext.setProjectList(updatedProjects);
    }

    function handlerRemoveProject(removeId: string) {
        const updatedProjects = projectListContext.projectList.filter(project => project.id !== removeId);
        projectListContext.setProjectList(updatedProjects);
    }

    return <>
        <div className={styles.header}>
            <p className={styles.title}>{PageList.projects}</p>
            <ButtonIcon iconSVG={plusIcon} caption={"Button for adding new project."} onClick={(toggleIsModalOpen as () => void)} />
        </div>
        <span className={styles.line} />
        <div className={styles.content}>
            <div className={styles.projectGrid}>
                {projectListContext.projectList.map(project =>
                    <span className={styles.span}>
                        <ProjectNote key={project.id} project={project} removeProject={handlerRemoveProject} />
                    </span>
                )}
            </div>
        </div>
        {isModalOpen && (
            <Modal handleDismiss={toggleIsModalOpen as ()=>void}>
                <ProjectForm operationTitle={FormOperation.create}
                    sendForm={handlerSendFormProject}
                    closeForm={(toggleIsModalOpen as () => void)} />
            </Modal>
        )}
    </>
}
