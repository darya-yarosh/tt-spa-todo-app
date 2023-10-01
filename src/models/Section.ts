import { TaskStatus } from "models/Task"

export interface SectionInfo {
    title: string,
    coordinates: {
        x: number,
        y: number,
        width: number,
        height: number
    }
}

export const SectionList: SectionInfo[] = [{
    title: TaskStatus.queue,
    coordinates: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
},
{
    title: TaskStatus.development,
    coordinates: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
},
{
    title: TaskStatus.done,
    coordinates: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
}
]