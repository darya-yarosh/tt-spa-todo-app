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
    function handlerAddNewTask(newTask: ToggleTask) {
        const updatedTasks = [...taskList, newTask]
        sendForm(updatedTasks)
    }

    function handlerEditTask(newTask: ToggleTask) {
        const updatedTaskIndex = taskList.findIndex(task => task.id === newTask.id);

        const updatedTaskList = [...taskList]
        updatedTaskList[updatedTaskIndex] = newTask;

        sendForm(updatedTaskList);
    }

    function handlerRemoveTask(taskId: string) {
        const updatedTaskList = taskList.filter(task => task.id !== taskId);
        sendForm(updatedTaskList);
    }

    return <div className={styles.wrapper}>
        <div className={styles.taskListWrapper}>
            {taskList.map(task =>
                <ToffleTaskForm key={task.id} task={task} removeTask={handlerRemoveTask} sendForm={handlerEditTask} />
            )}
        </div>
        <ToffleTaskForm sendForm={handlerAddNewTask} />
    </div>
}