import { ToggleTask } from "models/Task";

import ToggleTaskNote from "components/ToggleTask/ToggleTaskNote/ToggleTaskNote";

import styles from "components/ToggleTask/ToggleTaskList/ToggleTaskList.module.scss";

interface ToggleTaskListProps {
    taskList: ToggleTask[];
}

export default function ToggleTaskList({
    taskList: tasks,
}: ToggleTaskListProps) {
    return <div className={styles.wrapper}>
        {tasks.map(task =>
            <ToggleTaskNote key={task.id} task={task} />
        )}
    </div>
}