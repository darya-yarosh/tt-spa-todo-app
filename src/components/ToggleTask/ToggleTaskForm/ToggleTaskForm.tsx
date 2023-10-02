import { useEffect, useState } from "react";

import { ToggleTask } from "models/Task";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import removeIcon from "images/buttons/remove.svg";

import styles from "components/ToggleTask/ToggleTaskForm/ToggleTaskForm.module.scss";

interface ToggleTaskFormProps {
    task?: ToggleTask;
    sendForm: (newTask: ToggleTask) => void;
    removeTask?: (taskId: string) => void;
}

export default function ToggleTaskForm({
    task,
    sendForm,
    removeTask
}: ToggleTaskFormProps) {
    const [taskValue, setTaskValue] = useState<string>(task?.value || "");
    const [taskStatus, setTaskStatus] = useState<boolean>(task?.status || false);

    function handlerSendForm() {
        if (taskValue.length > 0) {
            const newTask: ToggleTask = {
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

    const placeholder = task === undefined ? "Tap 'Enter' to add toggle task" : ""

    useEffect(() => {
        handlerSendForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskStatus])

    return <div className={styles.wrapper} >
        <input type="checkbox" checked={taskStatus} disabled={task === undefined} onChange={editTaskStatus} />
        <textarea minLength={1} placeholder={placeholder} onChange={(event) => setTaskValue(event.target.value)} onKeyDown={handleKeyDown} value={taskValue} />
        {task?.id !== undefined && <ButtonIcon iconSVG={removeIcon} caption={"Button for delete current toggle task"} onClick={handlerRemoveTask} />}
    </div>
}