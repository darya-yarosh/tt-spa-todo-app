import { SetStateAction, createContext, useState } from 'react';

import Project from 'models/Project';
import { PageList } from 'models/Interface';

import Header from 'components/General/Header/Header';
import Footer from 'components/General/Footer/Footer';
import ProjectListPage from 'components/Pages/ProjectListPage/ProjectListPage';
import ProjectPage from 'components/Pages/ProjectPage/ProjectPage';

import 'App.scss';

export const OpenProjectContext = createContext((selectedProject: Project) => { });
export const ProjectListContext = createContext<ProjectListContextInterface>({
  projectList: [],
  setProjectList: function (value: SetStateAction<Project[]>): void {
    throw new Error('Function not implemented.');
  }
});

interface ProjectListContextInterface {
  projectList: Project[],
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>
}

function App() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<PageList>(PageList.projects);
  const [currentProject, setCurrentProject] = useState<Project>(projectList[-1]); // DEFAULT_PROJECT

  function openProjectPage(selectedProject: Project) {
    setCurrentProject(selectedProject);
    setCurrentPage(PageList.tasks);
  }
  function closeProjectPage() {
    setCurrentProject(projectList[-1]);
    setCurrentPage(PageList.projects);
  }

  const ProjectListContextValue = {
    projectList, setProjectList
  }

  return (
    <div className="app">
    <div className="app-wrapper">
      <Header />
      <ProjectListContext.Provider value={ProjectListContextValue}>
        <OpenProjectContext.Provider value={openProjectPage}>
          {currentPage === PageList.projects && <ProjectListPage />}
        </OpenProjectContext.Provider>
        {currentPage === PageList.tasks && <ProjectPage project={currentProject} returnToPrevPage={closeProjectPage} />}
      </ProjectListContext.Provider>
      <Footer />
    </div>
    </div>
  );
}

export default App;
