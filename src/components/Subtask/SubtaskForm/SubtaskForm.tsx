import { useEffect, useState } from "react";

import { Subtask } from "models/Task";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import removeIcon from "images/buttons/remove.svg";

import styles from "components/Subtask/SubtaskForm/SubtaskForm.module.scss";

interface SubtaskFormProps {
    task?: Subtask;
    sendForm: (newTask: Subtask) => void;
    removeTask?: (taskId: string) => void;
}

export default function SubtaskForm({
    task,
    sendForm,
    removeTask
}: SubtaskFormProps) {
    const [taskValue, setTaskValue] = useState<string>(task?.value || "");
    const [taskStatus, setTaskStatus] = useState<boolean>(task?.status || false);

    function handlerSendForm() {
        if (taskValue.length > 0) {
            const newTask: Subtask = {
                id: task?.id || crypto.randomUUID(),
                status: taskStatus,
                value: taskValue
            }
            if (task === undefined) setTaskValue("");
            sendForm(newTask);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            handlerSendForm()
        }
    };

    function editTaskStatus() {
        setTaskStatus(currentValue => !currentValue);
    }

    function handlerRemoveTask() {
        const taskId = task === undefined ? "" : task.id;
        
        if (task !== undefined && removeTask !== undefined) {
            removeTask(taskId)
        }
    }

    const placeholder = task === undefined ? "Tap 'Enter' to add subtask" : ""

    useEffect(() => {
        handlerSendForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskStatus])

    return <div className={styles.wrapper} >
        <input type="checkbox" checked={taskStatus} disabled={task === undefined} onChange={editTaskStatus} />
        <textarea minLength={1} placeholder={placeholder} onChange={(event) => setTaskValue(event.target.value)} onKeyDown={handleKeyDown} value={taskValue} />
        {task?.id !== undefined && <ButtonIcon iconSVG={removeIcon} caption={"Button for delete current subtask"} onClick={handlerRemoveTask} />}
    </div>
}