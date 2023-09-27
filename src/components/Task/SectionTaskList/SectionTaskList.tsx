import Task from "models/Task"

import TaskNote from "components/Task/TaskNote/TaskNote"

import "components/Task/SectionTaskList/SectionTaskList.scss"

interface SectionTaskListProps {
    taskList: Task[]
}

export default function SectionTaskList({
    taskList
}:SectionTaskListProps) {
    return <div className="section-wrapper">
        {taskList.map(task=><TaskNote task={task}/>)}
    </div>
}