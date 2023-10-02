import { AttachedFile } from "models/AttachedFile";
import { Comment } from "models/Comment";

export default interface Task {
    id: string,
    number: number,
    title: string,
    description: string,
    dateCreated: string,
    workingHours: number,
    dateEnded: string,
    priority: Priority,
    status: TaskStatus,
    subtasks: Subtask[],
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

export interface Subtask {
    id: string,
    status: boolean,
    value: string,
}

export function isValidTask(task: Task) {
    const isCorrectTitle = task.title.trim().length > 0 ? true : window.alert("Task title is empty. Please write something in title.");
    const isCorrectWorkingHours = task.workingHours > 0 ? true : window.alert("The task working hours must be greater than zero.");
    return isCorrectTitle && isCorrectWorkingHours;
}

export enum TaskInterface {
    task = "Task"
}

export enum TaskParameters {
    number = "Number",
    title = "Title",
    description = "Description",
    dateCreated = "Date created",
    workingHours = "Working hours",
    dateEnded = "Date ended",
    priority = "Priority",
    status = "Status",
    subtasks = "Subtasks",
    attachedFiles = "Attached files",
    comments = "Comments",
}