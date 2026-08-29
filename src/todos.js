import { projects } from "./projects.js";

function createToDo(projectName, title, description, dueDate, priority) {
    const todo = {
        title,
        description,
        dueDate,
        priority
    };

    const targetProject = projects.find((project) => project.name === projectName);
    targetProject.todos.push(todo);
}

export { createToDo };