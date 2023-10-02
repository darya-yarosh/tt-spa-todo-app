import Task from "models/Task";

export function getFilteredTasks(taskList: Task[], filter: string) {
    return taskList.filter((task: Task) =>
        task.number.toString().includes(filter)
        || task.title.toLowerCase().includes(filter.toLowerCase())
    );
}