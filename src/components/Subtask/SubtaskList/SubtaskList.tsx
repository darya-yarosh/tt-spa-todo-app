import { Subtask } from "models/Task";

import SubtaskNote from "components/Subtask/SubtaskNote/SubtaskNote";

import styles from "components/Subtask/SubtaskList/SubtaskList.module.scss";

interface SubtaskListProps {
    taskList: Subtask[];
}

export default function SubtaskList({
    taskList: tasks,
}: SubtaskListProps) {
    return <div className={styles.wrapper}>
        {tasks.map(task =>
            <SubtaskNote key={task.id} task={task} />
        )}
    </div>
}