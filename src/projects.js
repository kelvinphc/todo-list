const projects = [];

function createProject(name) {
    const project = {
        name,
        todos: []
    };

    projects.push(project);
}

function deleteProject(name) {
    const index = projects.findIndex((project) => project.name === name);

    projects.splice(index, 1);
}

export { projects, createProject, deleteProject };