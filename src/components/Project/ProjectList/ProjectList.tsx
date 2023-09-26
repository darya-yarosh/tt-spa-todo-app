import Project from "models/Project"

import ProjectNote from "components/Project/ProjectNote/ProjectNote"

import "components/Project/ProjectList/ProjectList.scss";

interface ProjectListProps {
    projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
    return <div className="project-grid">
        {projects.map(project =>
            <ProjectNote project={project} />
        )}
    </div>
}