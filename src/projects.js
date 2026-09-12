import { notifyChange } from "./events.js";
import { completeTodo } from "./todos.js";

let projects = [];

function createProject() {
    const project = {
        uuid: crypto.randomUUID(),
        title: generateUniqueTitle(),
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
    if (project === projects[0]) return;
    if (newTitle.trim() !== "") {
        project.title = newTitle;
        notifyChange();
    }
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    const defaultProject = {
        uuid: "a1b2c3d4-0000-4000-8000-000000000000",
        title: "Tasks",
        pendingTodos: [],
        completedTodos: []
    };

    projects = JSON.parse(localStorage.getItem("projects")) || [defaultProject];
}

function getPreviousProject(uuid) {
    const index = projects.findIndex((project) => project.uuid === uuid);
    return projects[index - 1];
}

function generateUniqueTitle() {
    const baseTitle = "Untitled Project";
    let title = baseTitle;
    let counter = 1;

    while (projects.some((project) => project.title === title)) {
        title = `${baseTitle} ${counter}`;
        counter++;
    }

    return title;
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