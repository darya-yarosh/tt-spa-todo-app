import { createContext, useContext, useEffect, useState } from "react";

import Task from "models/Task";
import Project from "models/Project";
import { SectionInfo, SectionList } from "models/Section";
import { FormOperation, PageList } from "models/Interface";

import TaskForm from "components/Task/TaskForm/TaskForm";
import SectionTaskList from "components/Task/SectionTaskList/SectionTaskList";
import ProjectForm from 'components/Project/ProjectForm/ProjectForm';
import SearchInput from "components/General/SearchInput/SearchInput";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import editIcon from "images/buttons/edit.svg";
import plusIcon from "images/buttons/plus.svg";
import returnIcon from "images/buttons/return.svg";

import { getFilteredTasks } from "logic/utils/Helper";
import TaskController from "logic/storage/TaskController";
import ProjectController from "logic/storage/ProjectController";

import styles from "components/Pages/ProjectPage/ProjectPage.module.scss";

import { ModalContext, StorageContext } from "App";

export const SectionInfoListContext = createContext<SectionInfo[]>([]);

interface ProejctPageProps {
    project: Project,
    returnToPrevPage: () => void;
}

export default function ProjectPage({
    project,
    returnToPrevPage
}: ProejctPageProps) {
    const modal = useContext(ModalContext);

    const [searchFilter, setSearchFilter] = useState<string>("");
    const [taskList, setTaskList] = useState<Task[]>(project.tasks)
    const storageContext = useContext(StorageContext)

    async function handlerSendFormProject(newProject: Project) {
        await ProjectController.setProject(project.id, newProject).then(storageContext.updateStorage);
    }

    function handleOpenProjectTitleEditForm() {
        modal.setContent(<ProjectForm
            project={project}
            operationTitle={FormOperation.create}
            sendForm={handlerSendFormProject}
            closeForm={modal.toggle} />)
        modal.toggle();
    }

    function handlerOpenTaskForm() {
        modal.setContent(<TaskForm operationTitle={FormOperation.create}
            sendForm={handlerCreateTask}
            closeForm={modal.toggle} />)
        modal.toggle();
    }

    async function handlerCreateTask(newTask: Task) {
        await TaskController.createTask(project.id, newTask).then(storageContext.updateStorage)
    }

    useEffect(() => {
        if (searchFilter === "") {
            setTaskList(project.tasks);
        } else {
            setTaskList(getFilteredTasks(project.tasks, searchFilter))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchFilter, project])

    return <div className={styles.wrapper}>
        <div className={styles.header}>
            <span className={styles.span}>
                <ButtonIcon iconSVG={returnIcon}
                    caption={"Button for return to project list."}
                    onClick={returnToPrevPage} />
                <p className={styles.title}><span>Project&nbsp;</span><span>"{project.title}"</span></p>
                <ButtonIcon iconSVG={editIcon}
                    caption={"Button for open edit form for project title."}
                    onClick={handleOpenProjectTitleEditForm} />
            </span>
            <span className={styles.span}>
                <SearchInput
                    value={searchFilter}
                    onChange={setSearchFilter}
                    placeholderValue="Search"
                />
                <p className={styles.title}>{PageList.tasks}</p>
                <ButtonIcon iconSVG={plusIcon} caption={"Button for adding new task."}
                    onClick={handlerOpenTaskForm} />
            </span>
        </div>
        <span className={styles.line} />
        <div className={styles.content}>
            <div className={styles.grid}>
                <SectionInfoListContext.Provider value={SectionList}>
                    {SectionList.map(section =>
                        <SectionTaskList key={section.title} title={section.title} taskList={taskList.filter(task => task.status === section.title)} projectId={project.id} />
                    )}
                </SectionInfoListContext.Provider>
            </div>
        </div>
    </div>
}