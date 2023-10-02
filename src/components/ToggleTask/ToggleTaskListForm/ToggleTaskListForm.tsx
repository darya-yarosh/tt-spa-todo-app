import { ToggleTask } from "models/Task";

import ToffleTaskForm from "components/ToggleTask/ToggleTaskForm/ToggleTaskForm";

import styles from "components/ToggleTask/ToggleTaskListForm/ToggleTaskListForm.module.scss";

interface ToggleTaskListFormProps {
    taskList: ToggleTask[];
    sendForm: (taskList: ToggleTask[]) => void;
}

export default function ToggleTaskListForm({
    taskList,
    sendForm,
}: ToggleTaskListFormProps) {
    function addNewTask(newTask: ToggleTask) {
        const updatedTasks = [...taskList, newTask]
        sendForm(updatedTasks)
    }

    function editTask(newTask: ToggleTask) {
        const updatedTaskIndex = taskList.findIndex(task => task.id === newTask.id);

        const updatedTaskList = [...taskList]
        updatedTaskList[updatedTaskIndex] = newTask;

        sendForm(updatedTaskList);
    }

    function removeTask(taskId: string) {
        const updatedTaskList = taskList.filter(task => task.id !== taskId);
        sendForm(updatedTaskList);
    }

    return <div className={styles.wrapper}>
        <div className={styles.taskListWrapper}>
            {taskList.map(task =>
                <ToffleTaskForm key={task.id} task={task} removeTask={removeTask} sendForm={editTask} />
            )}
        </div>
        <ToffleTaskForm sendForm={addNewTask} />
    </div>
}