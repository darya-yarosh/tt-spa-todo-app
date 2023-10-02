import Project from "models/Project";
import Storage from "models/Storage";

import StorageController from "logic/storage/StorageController";

export class ProjectControllerClass {
    async createProject(newProject: Project) {
        const updatedProjectList = await this.getProjectList();
        if (newProject.id === "") newProject.id = crypto.randomUUID();
        updatedProjectList.push(newProject)
        await this.setProjectList(updatedProjectList);
    }

    async removeProject(projectId: string) {
        const updatedProjectList = await this.getProjectList();
        const projectIndex = updatedProjectList.findIndex(project => project.id === projectId);
        if (projectIndex === -1) {
            window.alert("The project with the selected ID was not found.")
            return;
        }
        
        updatedProjectList.splice(projectIndex, 1)
        await this.setProjectList(updatedProjectList);
    }

    async getProject(projectId: string) {
        const projectList = await this.getProjectList();
        const project = projectList.find(project => project.id === projectId);
        return project as Project;
    }

    async setProject(projectId: string, updatedProject: Project) {
        const updatedProjectList = await this.getProjectList();
        const projectIndex = updatedProjectList.findIndex(project => project.id === projectId);
        updatedProjectList[projectIndex] = updatedProject;
        await this.setProjectList(updatedProjectList);
    }

    async getProjectList() {
        const storageData = await StorageController.getStorageData();
        if (storageData === undefined) {
            const emptyProjectList: Project[] = []
            return emptyProjectList;
        }
        return storageData.projects;
    }

    async setProjectList(updatedProjectList: Project[]) {
        const updatedStorageData: Storage = {
            projects: updatedProjectList
        }

        await StorageController.setStorageData(updatedStorageData);
    }
}

const ProjectController = new ProjectControllerClass();

export default ProjectController;