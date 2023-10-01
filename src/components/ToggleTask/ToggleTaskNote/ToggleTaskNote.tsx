import { ToggleTask } from "models/Task";

import styles from "components/ToggleTask/ToggleTaskNote/ToggleTaskNote.module.scss";

interface ToggleTaskNoteProps {
    task: ToggleTask,
}

export default function ToggleTaskNote({
    task,
}: ToggleTaskNoteProps) {
    return <div className={styles.wrapper}>
        <input type="checkbox" checked={task.status} disabled />
        <p>{task.value}</p>
    </div>
}