let projects = [];

function createProject(title) {
    const project = {
        title,
        pendingTodos: [],
        completedTodos: []
    };

    projects.push(project);
}

function deleteProject(title) {
    const index = projects.findIndex((project) => project.title === title);

    projects.splice(index, 1);
}

function changeProjectTitle(project) {
    const newTitle = prompt("Please enter new title");

    if (newTitle === null) {
        return;
    } else {
        project.title = newTitle;
    }
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    projects = JSON.parse(localStorage.getItem("projects"));
}

export { 
    projects, 
    createProject, 
    deleteProject, 
    changeProjectTitle,
    saveProjects,
    loadProjects
};