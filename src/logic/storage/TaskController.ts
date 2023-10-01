import Task from "models/Task";

import ProjectController from "logic/storage/ProjectController";

export default class TaskController {
    async createTask(projectId: string, newTask: Task) {
        const projectController = new ProjectController();
        const project = await projectController.getProject(projectId);

        if (newTask.id === "") newTask.id = crypto.randomUUID();
        project.tasks.push(newTask)
        await projectController.setProject(projectId, project);
    }

    async removeTask(projectId: string, taskId: string) {
        const projectController = new ProjectController();
        const updatedProject = await projectController.getProject(projectId);

        const taskIndex = updatedProject.tasks.findIndex(task => task.id === taskId);
        updatedProject.tasks.splice(taskIndex, 1);
        await projectController.setProject(projectId, updatedProject);
    }

    async getTask(taskId: string, projectId: string) {
        const taskList = await this.getTaskList(projectId);
        const task = taskList.find(task => task.id === taskId);
        return task;
    }

    async setTask(taskId: string, projectId: string, updatedTask: Task) {
        const projectController = new ProjectController();
        const updatedProject = await projectController.getProject(projectId);

        const taskIndex = updatedProject.tasks.findIndex(task => task.id === taskId);
        updatedProject.tasks[taskIndex] = updatedTask;

        await projectController.setProject(projectId, updatedProject);
    }

    async getTaskList(projectId: string) {
        const projectController = new ProjectController();
        const project = await projectController.getProject(projectId);
        return project.tasks;
    }

    async setTaskList(projectId: string, updatedTaskList: Task[],) {
        const projectController = new ProjectController();
        const updatedProject = await projectController.getProject(projectId);
        updatedProject.tasks = updatedTaskList;

        await projectController.setProject(projectId, updatedProject);
    }
}


