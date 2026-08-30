const projects = [];

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

export { projects, createProject, deleteProject };