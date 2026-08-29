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

function deleteToDo(projectName, title) {
    const targetProject = projects.find((project) => project.name === projectName);

    const index = targetProject.todos.findIndex((todo) => todo.title === title);

    targetProject.todos.splice(index, 1);
}

export { createToDo, deleteToDo };