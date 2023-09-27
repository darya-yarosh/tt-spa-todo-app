export default interface Task {
    id: string,
    number: number,
    title: string,
    desc: string,
    dataCreated: Date,
    timeInWork: string,
    dateEnded: Date,
    priority: Priority,
    status: TaskStatus,
    subtasks: Subtask[],
    attachedFiles: AttachedFile[],
    comments: Comment[],
}

export enum Priority {
    low= "low",
    medium= "medium",
    high= "high",
    critical= "critical"
}

export enum TaskStatus {
    queue = "Queue",
    development = "Development",
    done = "Done",
}

export interface AttachedFile {
    id: string,
    name: string,
    file: File,
}

export interface Comment {
    id: string,
    value: string,
    subComments: Comment[],
}

export interface Subtask {
    id: string,
    status: false,
    value: string,
}