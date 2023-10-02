import { useState } from "react";

import Task, { Priority, Subtask, TaskStatus, isValidTask, TaskParameters, TaskInterface } from "models/Task";
import { Comment } from "models/Comment";
import { AttachedFile } from "models/AttachedFile";
import { FormOperation, BUTTON } from "models/Interface";

import SubtaskListForm from "components/Subtask/SubtaskListForm/SubtaskListForm";
import AttachedFileListForm from "components/AttachedFiles/AttachedFileListForm/AttachedFileListForm";
import CommentListForm from "components/Comment/CommentListForm/CommentListForm";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import returnIcon from "images/buttons/return.svg";
import confirmIcon from "images/buttons/confirm.svg";

import styles from "components/Task/TaskForm/TaskForm.module.scss"

interface TaskFormProps {
    task?: Task
    operationTitle: FormOperation
    sendForm: (task: Task) => void;
    closeForm: () => void
}

export default function TaskForm({
    task,
    operationTitle,
    sendForm,
    closeForm,
}: TaskFormProps) {
    const [title, setTitle] = useState<string>(task?.title || "");
    const [description, setDescription] = useState<string>(task?.description || "");
    const [workingHours, setWorkingHours] = useState<number>(task?.workingHours || 1);
    const [priority, setPriority] = useState<Priority>(task?.priority || Priority.low);
    const [status, setStatus] = useState<TaskStatus>(task?.status || TaskStatus.queue)
    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>(task?.attachedFiles || []);
    const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks || []);
    const [comments, setComments] = useState<Comment[]>(task?.comments || []);

    const priorityList: Priority[] = [Priority.low, Priority.medium, Priority.high, Priority.critical];
    const statusList: TaskStatus[] = [TaskStatus.queue, TaskStatus.development, TaskStatus.done];

    function handlerSendForm() {
        const newTask: Task = {
            id: task?.id || crypto.randomUUID(),
            number: 1,
            title: title,
            description: description,
            dateCreated: task?.dateCreated || new Date().toLocaleDateString('ru-RU'),
            workingHours: workingHours,
            dateEnded: (status !== TaskStatus.done) ? "" : new Date().toLocaleDateString('ru-RU'),
            priority: priority,
            status: status,
            subtasks: subtasks,
            attachedFiles: attachedFiles,
            comments: comments
        }
        if (!isValidTask(newTask)) {
            return;
        }

        sendForm(newTask);
        closeForm();
    }

    return <form className={styles.wrapper} onSubmit={(event) => {
        event.preventDefault();
    }}>
        <div className={styles.header}>
            <ButtonIcon iconSVG={returnIcon} caption={BUTTON.return} onClick={closeForm} />
            <p>{operationTitle} {TaskInterface.task.toLowerCase()}:</p>
        </div>
        <span className={styles.line} />
        <div className={styles.content}>
            <span>
                <label>{TaskParameters.title}:</label>
                <input className={styles.input__string} type="text" placeholder="№1 Task name" minLength={1} maxLength={50}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
            </span>
            <span>
                <label>{TaskParameters.description}:</label>
                <textarea className={styles.input__string} placeholder="This is task description." maxLength={255}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />
            </span>
            <span>
                <label>{TaskParameters.workingHours}:</label>
                <input className={styles.input__number} type="number" placeholder="40" min={1}
                    value={workingHours}
                    onChange={(event) => setWorkingHours(Number(event.target.value))} />
            </span>
            <span>
                <span>
                    <label>{TaskParameters.priority}:</label>
                    <select value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
                        {priorityList.map((priorityVariant: Priority) =>
                            <option key={priorityVariant} value={priorityVariant}>{priorityVariant}</option>
                        )}
                    </select>
                </span>
                <span>
                    <label>{TaskParameters.status}:</label>
                    <select value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)}>
                        {statusList.map((statusVariant: TaskStatus) =>
                            <option key={statusVariant} value={statusVariant}>{statusVariant}</option>
                        )}
                    </select>
                </span>
            </span>
            <span>
                <label>{TaskParameters.attachedFiles}:</label>
                <AttachedFileListForm noteAttachedFiles={attachedFiles} sendForm={setAttachedFiles} />
            </span>
            <span>
                <label>{TaskParameters.subtasks}:</label>
                <SubtaskListForm taskList={subtasks} sendForm={setSubtasks} />
            </span>
            <span>
                <label>{TaskParameters.comments}:</label>
                <CommentListForm comments={comments} sendForm={(comments: Comment[]) => setComments(comments)} />
            </span>
        </div>
        <div className={styles.navigation}>
            <ButtonIcon iconSVG={confirmIcon} caption={BUTTON.save} onClick={handlerSendForm} />
        </div>
    </form>
}