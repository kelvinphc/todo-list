const projects = [];

function createProject(name) {
    const project = {
        name,
        todos: []
    };

    projects.push(project);
}

export { projects, createProject };