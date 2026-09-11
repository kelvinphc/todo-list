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

    projects.splice(index, 1);
    notifyChange();
}

function changeProjectTitle(project) {
    const newTitle = prompt("Please enter new title");

    if (newTitle === null) {
        return;
    } else {
        project.title = newTitle;
    }

    notifyChange();
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    projects = JSON.parse(localStorage.getItem("projects")) || [];
}

export { 
    projects, 
    createProject, 
    deleteProject, 
    changeProjectTitle,
    saveProjects,
    loadProjects
};