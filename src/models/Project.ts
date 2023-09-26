import Task from "models/Task";

export default interface Project {
    id: string,
    title: string,
    tasks: Task[]
}