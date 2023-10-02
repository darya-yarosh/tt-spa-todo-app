import { createContext, useState } from 'react';

import Storage from 'models/Storage';
import Project from 'models/Project';
import { PageList } from 'models/Interface';

import Header from 'components/General/Header/Header';
import Footer from 'components/General/Footer/Footer';
import Modal from 'components/General/Modal/Modal';
import ProjectListPage from 'components/Pages/ProjectListPage/ProjectListPage';
import ProjectPage from 'components/Pages/ProjectPage/ProjectPage';

import StorageController from 'logic/storage/StorageController';
import useToggle from 'logic/utils/use-toggle';

import 'App.scss';

interface StorageContextProps {
	updateStorage: () => void;
}
export const StorageContext = createContext<StorageContextProps>({
	updateStorage: () => { },
});

interface PageControllerContextProps {
	openProjectPage: (selectedProject: Project)=>void;
}
export const PageControllerContext = createContext<PageControllerContextProps>({
	openProjectPage: (selectedProject: Project)=>{ },
});

interface ModalContextProps {
	toggle: () => void,
	setContent: (element: JSX.Element) => void
}
export const ModalContext = createContext<ModalContextProps>({
	toggle: () => { },
	setContent: (element: JSX.Element) => { },
});


export default function App() {
	const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
	const [isModalOpen, toggleIsModalOpen] = useToggle(false);
	const [isLoadedData, setIsLoadedData] = useState<boolean>(false);
	const [storage, setStorage] = useState<Storage>({ projects: [] });
	const [currentPage, setCurrentPage] = useState<PageList>(PageList.projects);
	const [currentProject, setCurrentProject] = useState<Project>({} as Project);

	function openProjectPage(selectedProject: Project) {
		const projectIndex = storage.projects.findIndex(project => project.id === selectedProject.id);
		setCurrentProject(storage.projects[projectIndex])
		setCurrentPage(PageList.tasks);
	}
	function closeProjectPage() {
		setCurrentProject(storage.projects[-1])
		setCurrentPage(PageList.projects);
	}

	async function loadStorageData() {
		await StorageController.getStorageData().then(async data => {
			setCurrentProject(storage.projects[-1]);
			if (data !== undefined) {
				const currentProjectIndex = data.projects.findIndex(project => project.id === (currentProject?.id || ""))
				setCurrentProject(data.projects[currentProjectIndex]);

				setStorage(data);
				setIsLoadedData(true);
			}
		});
	}

	const modalContextValue: ModalContextProps = {
		toggle: toggleIsModalOpen as () => void,
		setContent: setModalContent
	}

	if (!isLoadedData) {
		loadStorageData();

		return <div>
			Loading...
		</div>
	}
	return (
		<div id="app" className="app">
			<div className="app-wrapper">
				<Header />
				<ModalContext.Provider value={modalContextValue}>
					<StorageContext.Provider value={{updateStorage: loadStorageData}}>
						<PageControllerContext.Provider value={{openProjectPage: openProjectPage}}>
							{currentPage === PageList.projects && <ProjectListPage projectList={storage.projects} />}
						</PageControllerContext.Provider>
						{currentPage === PageList.tasks && <ProjectPage project={currentProject} returnToPrevPage={closeProjectPage} />}
					</StorageContext.Provider>
				</ModalContext.Provider>
				<Footer />
				{isModalOpen && <Modal handleDismiss={toggleIsModalOpen as () => void}>{modalContent}</Modal>}
			</div>
		</div>
	);
}