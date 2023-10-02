import { Subtask } from "models/Task";

import styles from "components/Subtask/SubtaskNote/SubtaskNote.module.scss";

interface SubtaskNoteProps {
    task: Subtask,
}

export default function SubtaskNote({
    task,
}: SubtaskNoteProps) {
    return <div className={styles.wrapper}>
        <input type="checkbox" checked={task.status} disabled />
        <p>{task.value}</p>
    </div>
}