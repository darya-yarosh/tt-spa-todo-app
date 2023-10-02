import Project from "models/Project";
import Storage from "models/Storage";
import { Priority, TaskStatus } from "models/Task";

const MOCK_PROJECTLIST: Project[] = [{
    id: crypto.randomUUID(),
    title: "Project #1",
    tasks: [{
        id: crypto.randomUUID(),
        number: 1,
        title: "Title of task",
        description: "Description of the task. This description is very-very long, you can trust me.",
        dateCreated: new Date().toLocaleDateString('ru-RU'),
        workingHours: 40,
        dateEnded: "",
        priority: Priority.high,
        status: TaskStatus.queue,
        subtasks: [],
        attachedFiles: [],
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        number: 2,
        title: "Some task",
        description: "This task is under development.",
        dateCreated: new Date().toLocaleDateString('ru-RU'),
        workingHours: 30,
        dateEnded: "",
        priority: Priority.medium,
        status: TaskStatus.development,
        subtasks: [],
        attachedFiles: [],
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        number: 3,
        title: "Create css-theme changer for app",
        description: "",
        dateCreated: new Date().toLocaleDateString('ru-RU'),
        workingHours: 20,
        dateEnded: new Date().toLocaleDateString('ru-RU'),
        priority: Priority.low,
        status: TaskStatus.done,
        subtasks: [],
        attachedFiles: [],
        comments: [],
    },
]
}]

export const MOCK_STORAGE: Storage = {
    projects: MOCK_PROJECTLIST
}