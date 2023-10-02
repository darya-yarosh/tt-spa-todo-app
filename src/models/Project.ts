import Task from "models/Task";

export default interface Project {
    id: string,
    title: string,
    tasks: Task[]
}

export function isValidProject(project: Project) {
    const isCorrectTitle = project.title.trim().length > 0;
    return isCorrectTitle;
}