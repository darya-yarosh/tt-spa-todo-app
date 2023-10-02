import { createRef, useContext, useEffect } from "react";

import Task, { TaskParameters, TaskStatus } from "models/Task"
import { BUTTON, FormOperation } from "models/Interface";

import TaskForm from "components/Task/TaskForm/TaskForm";
import AttachedFileList from "components/AttachedFiles/AttachedFileList/AttachedFileList";
import SubtaskList from "components/Subtask/SubtaskList/SubtaskList";
import CommentList from "components/Comment/CommentList/CommentList";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import removeIcon from "images/buttons/remove.svg";
import editIcon from "images/buttons/edit.svg";

import styles from "components/Task/TaskNote/TaskNote.module.scss"

import { SectionInfoListContext } from "components/Pages/ProjectPage/ProjectPage";
import { ModalContext } from "App";

interface TaskNoteProps {
    task: Task,
    updateTask: (updatedTask: Task) => void,
    removeTask: (taskId: string) => void,
}

export default function TaskNote({
    task,
    updateTask,
    removeTask
}: TaskNoteProps) {
    const modal = useContext(ModalContext);

    const sectionInfoList = useContext(SectionInfoListContext);

    function openEditForm() {
        modal.setContent(<TaskForm
            task={task}
            operationTitle={FormOperation.create}
            sendForm={updateTask}
            closeForm={modal.closeModal} />)
        modal.openModal();
    }

    function handlerRemoveTask() {
        const isConfirm = window.confirm(`You want to delete task "${task.number} | ${task.title}". Are you sure?`)

        if (isConfirm) {
            removeTask(task.id);
        }
    }

    // Реализация drag-n-drop
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        if (ref.current !== null) {
            const element = ref.current;

            element.addEventListener("dragstart", () => {
                element.classList.add("is-dragging");
            })
            element.addEventListener("dragend", (e) => {
                let newSection = null;
                // Проверка на codпадение с секцией
                sectionInfoList.forEach(sectionInfo => {
                    const isCorrectXPosition = (sectionInfo.coordinates.x - 25) <= e.clientX
                        && e.clientX <= (sectionInfo.coordinates.x + sectionInfo.coordinates.width + 25);
                    const isCorrectYPosition = (sectionInfo.coordinates.y - 25) <= e.clientY
                        && e.clientY <= (sectionInfo.coordinates.y + sectionInfo.coordinates.height + 25);

                    if (isCorrectXPosition && isCorrectYPosition) {
                        newSection = sectionInfo.title;
                    }
                })
                // Если совпало - обновление таски
                if (newSection !== null && newSection !== task.status) {
                    const draggedTask = { ...task };
                    const isDraggedFromOtherToDone = newSection === TaskStatus.done && task.status !== TaskStatus.done;
                    const isDraggedFromDoneToOther = newSection !== TaskStatus.done && task.status === TaskStatus.done;

                    draggedTask.status = newSection;
                    draggedTask.dateEnded = isDraggedFromOtherToDone
                        ? new Date().toLocaleDateString('ru-RU')
                        : isDraggedFromDoneToOther
                            ? ""
                            : draggedTask.dateEnded;
                    updateTask(draggedTask);
                }
                element.classList.remove("is-dragging");
            })
        }
        return () => {
            if (ref.current !== null) {
                const element = ref.current;
                element.removeEventListener("dragstart", () => {
                    element.classList.add("is-dragging");
                })
                element.removeEventListener("dragend", () => {
                    element.classList.remove("is-dragging");
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current, task]);

    return <div ref={ref} className={styles.wrapper} draggable="true">
        <div className={styles.header}>
            <span>
                <ButtonIcon iconSVG={editIcon} caption={BUTTON.edit} onClick={openEditForm} />
                <p>{task.number} | {task.title}</p>
            </span>
            <span>
                <ButtonIcon iconSVG={removeIcon} caption={BUTTON.remove} onClick={handlerRemoveTask} />
            </span>
        </div>
        <span className={styles.line} />
        <div className={styles.content}>
            <span className={styles.property}>
                <p className={styles.label}>{TaskParameters.description}: {task.description}</p>
            </span>
            <span className={styles.property}>
                <p className={styles.label}>{TaskParameters.workingHours}: {task.workingHours}</p>
            </span>
            <span className={styles.property}>
                <p className={styles.label}>{TaskParameters.priority}: {task.priority}</p>
            </span>
            <span className={styles.property}>
                <p className={styles.label}>{TaskParameters.attachedFiles}: {task.attachedFiles.length}</p>
                {task.attachedFiles.length > 0 && <AttachedFileList noteAttachedFiles={task.attachedFiles} />}
            </span>
            <span className={styles.property}>
                <label className={styles.label}>{TaskParameters.subtasks}:</label>
                <SubtaskList taskList={task.subtasks} />
            </span>
            <span className={styles.property}>
                <label className={styles.label}>{TaskParameters.comments}:</label>
                <CommentList comments={task.comments} />
            </span>
        </div>
        <span className={styles.line} />
        <div className={styles.dateInfo}>
            <span>{task.dateCreated}</span>
            <span>{task.dateEnded}</span>
        </div>
    </div>
}