import { createRef, useContext, useEffect } from "react";

import Task from "models/Task"

import TaskNote from "components/Task/TaskNote/TaskNote"
import { SectionInfoListContext } from "components/Pages/ProjectPage/ProjectPage";

import TaskController from 'logic/storage/TaskController';

import styles from "components/Task/SectionTaskList/SectionTaskList.module.scss"

import { UpdateStorageContext } from "App";

interface SectionTaskListProps {
    title: string,
    taskList: Task[],
    projectId: string,
}

export default function SectionTaskList({
    title,
    taskList,
    projectId,
}: SectionTaskListProps) {
    const updateStorageContext = useContext(UpdateStorageContext);
    const ref = createRef<HTMLDivElement>();

    const sectionCoordinatesList = useContext(SectionInfoListContext);

    async function updateTask(updatedTask: Task) {
        const taskController = new TaskController();
        await taskController.setTask(updatedTask.id, projectId, updatedTask).then(updateStorageContext);
    }

    async function removeTask(taskId: string) {
        const taskController = new TaskController();
        await taskController.removeTask(projectId, taskId).then(updateStorageContext);
    }

    useEffect(() => {
        const sectionIndex = sectionCoordinatesList.findIndex(sectionCoordinates => sectionCoordinates.title === title)
        sectionCoordinatesList[sectionIndex].title = title;
        if (ref.current !== null) {
            const currentSectionCoordinates = ref.current.getBoundingClientRect();
            sectionCoordinatesList[sectionIndex].coordinates.width = currentSectionCoordinates.width
            sectionCoordinatesList[sectionIndex].coordinates.height = currentSectionCoordinates.height
            sectionCoordinatesList[sectionIndex].coordinates.x = currentSectionCoordinates.x
            sectionCoordinatesList[sectionIndex].coordinates.y = currentSectionCoordinates.y
        }
    }, [])

    return <div ref={ref} className={styles.wrapper}>
        <p className={styles.title}>{title}</p>
        <span className={styles.line} />
        <div className={styles.content}>
            {taskList.map(task => <TaskNote key={task.id} task={task} updateTask={updateTask} removeTask={removeTask} />)}
        </div>
    </div>
}