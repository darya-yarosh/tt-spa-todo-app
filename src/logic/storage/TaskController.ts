import Task from "models/Task";

import ProjectController from "logic/storage/ProjectController";

export class TaskControllerClass {
    async createTask(projectId: string, newTask: Task) {
        const project = await ProjectController.getProject(projectId);

        if (newTask.id === "") newTask.id = crypto.randomUUID();
        project.tasks.push(newTask)
        await ProjectController.setProject(projectId, project);
    }

    async removeTask(projectId: string, taskId: string) {
        const updatedProject = await ProjectController.getProject(projectId);
        const taskIndex = updatedProject.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            window.alert("The task with the selected ID was not found.")
            return;
        }

        updatedProject.tasks.splice(taskIndex, 1);
        await ProjectController.setProject(projectId, updatedProject);
    }

    async getTask(taskId: string, projectId: string) {
        const taskList = await this.getTaskList(projectId);
        const task = taskList.find(task => task.id === taskId);
        return task;
    }

    async setTask(taskId: string, projectId: string, updatedTask: Task) {
        const updatedProject = await ProjectController.getProject(projectId);

        const taskIndex = updatedProject.tasks.findIndex(task => task.id === taskId);
        updatedProject.tasks[taskIndex] = updatedTask;

        await ProjectController.setProject(projectId, updatedProject);
    }

    async getTaskList(projectId: string) {
        const project = await ProjectController.getProject(projectId);
        return project.tasks;
    }

    async setTaskList(projectId: string, updatedTaskList: Task[],) {
        const updatedProject = await ProjectController.getProject(projectId);
        updatedProject.tasks = updatedTaskList;

        await ProjectController.setProject(projectId, updatedProject);
    }
}

const TaskController = new TaskControllerClass();

export default TaskController;
