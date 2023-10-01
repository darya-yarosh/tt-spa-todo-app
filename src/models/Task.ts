import { AttachedFile } from "models/AttachedFile";
import { Comment } from "models/Comment";

export default interface Task {
    id: string,
    number: number,
    title: string,
    desc: string,
    dataCreated: string,
    workingHours: number,
    dateEnded: string,
    priority: Priority,
    status: TaskStatus,
    subtasks: ToggleTask[],
    attachedFiles: AttachedFile[],
    comments: Comment[],
}

export enum Priority {
    low = "low",
    medium = "medium",
    high = "high",
    critical = "critical"
}

export enum TaskStatus {
    queue = "Queue",
    development = "Development",
    done = "Done",
}

export interface ToggleTask {
    id: string,
    status: boolean,
    value: string,
}