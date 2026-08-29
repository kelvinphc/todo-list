const projects = [];

function createProject(name) {
    const project = {
        name,
        todos: []
    };

    projects.push(project);
}

function deleteProject(name) {
    const projectIndex = projects.findIndex((project) => project.name === name);

    projects.splice(projectIndex, 1);
}

export { projects, createProject, deleteProject };