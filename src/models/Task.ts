export default interface Task {
    id: string,
    number: number,
    title: string,
    desc: string,
    dataCreated: Date,
    timeInWork: string,
    dateEnded: Date,
    priority: Priority,
    status: Status,
    subtasks: Task[],
    attachedFiles: AttachedFile[],
    comments: Comment[],
}

export type Priority = {
    low: "low",
    medium: "medium",
    high: "high",
    critical: "critical"
}

export type Status = {
    queue: "Queue",
    development: "Development",
    done: "Done",
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