import { Subtask } from "models/Task";

import SubtaskForm from "components/Subtask/SubtaskForm/SubtaskForm";

import styles from "components/Subtask/SubtaskListForm/SubtaskListForm.module.scss";

interface SubtaskListFormProps {
    taskList: Subtask[];
    sendForm: (taskList: Subtask[]) => void;
}

export default function SubtaskListForm({
    taskList,
    sendForm,
}: SubtaskListFormProps) {
    function addNewTask(newTask: Subtask) {
        const updatedTasks = [...taskList, newTask]
        sendForm(updatedTasks)
    }

    function editTask(newTask: Subtask) {
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
                <SubtaskForm key={task.id} task={task} removeTask={removeTask} sendForm={editTask} />
            )}
        </div>
        <SubtaskForm sendForm={addNewTask} />
    </div>
}