import { notifyChange } from "./events.js";

let projects = [];

function createProject() {
    const project = {
        uuid: crypto.randomUUID(),
        title: "Untitled Project",
        pendingTodos: [],
        completedTodos: []
    };

    projects.push(project);
    notifyChange();
}

function deleteProject(uuid) {
    const index = projects.findIndex((project) => project.uuid === uuid);

    if (index === 0) return;
    projects.splice(index, 1);
    notifyChange();
}

function changeProjectTitle(project, newTitle) {
    if (newTitle.trim() !== "") {
        project.title = newTitle;
        notifyChange();
    }
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    projects = JSON.parse(localStorage.getItem("projects")) || [];
}

function getPreviousProject(uuid) {
    const index = projects.findIndex((project) => project.uuid === uuid);
    return projects[index - 1];
}

export { 
    projects, 
    createProject, 
    deleteProject, 
    changeProjectTitle,
    saveProjects,
    loadProjects,
    getPreviousProject
};