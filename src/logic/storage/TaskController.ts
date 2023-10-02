import Task from "models/Task";

import ProjectController from "logic/storage/ProjectController";

export class TaskControllerClass {
    async createTask(projectId: string, newTask: Task) {
        const updatedProject = await ProjectController.getProject(projectId);
        if (updatedProject === undefined) {
            window.alert("An error occurred while trying to create the task.")
            return;
        };

        if (newTask.id === "") newTask.id = crypto.randomUUID();
        const lastProjectTask = updatedProject.tasks[updatedProject.tasks.length - 1];
        newTask.number = lastProjectTask !== undefined ? (lastProjectTask.number + 1) : 1;

        updatedProject.tasks.push(newTask)
        await ProjectController.setProject(projectId, updatedProject);
    }

    async removeTask(projectId: string, taskId: string) {
        const updatedProject = await ProjectController.getProject(projectId);
        if (updatedProject === undefined) {
            window.alert("An error occurred while trying to remove the task.")
            return;
        };

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
        if (taskList === undefined) {
            window.alert("An error occurred while trying to get the task list.")
            return;
        };

        const task = taskList.find(task => task.id === taskId);
        return task;
    }

    async setTask(taskId: string, projectId: string, updatedTask: Task) {
        const updatedProject = await ProjectController.getProject(projectId);
        if (updatedProject === undefined) {
            window.alert("An error occurred while trying to get the task list.")
            return;
        }

        const taskIndex = updatedProject.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            window.alert("The task with the selected ID was not found.")
            return;
        }
        updatedProject.tasks[taskIndex] = updatedTask;

        await ProjectController.setProject(projectId, updatedProject);
    }

    async getTaskList(projectId: string) {
        const project = await ProjectController.getProject(projectId);
        if (project === undefined) {
            window.alert("An error occurred while trying to get the task list.")
            return;
        }

        return project.tasks;
    }

    async setTaskList(projectId: string, updatedTaskList: Task[],) {
        const updatedProject = await ProjectController.getProject(projectId);
        if (updatedProject === undefined) {
            window.alert("An error occurred while trying to set the task list.")
            return;
        }

        updatedProject.tasks = updatedTaskList;

        await ProjectController.setProject(projectId, updatedProject);
    }
}

const TaskController = new TaskControllerClass();

export default TaskController;
