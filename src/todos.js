import { projects } from "./projects.js";

function createTodo(projectName, title, description, dueDate, priority) {
    const todo = {
        title,
        description,
        dueDate,
        priority
    };

    const targetProject = projects.find((project) => project.name === projectName);
    targetProject.pendingTodos.push(todo);
}

function deleteTodo(projectName, title) {
    const targetProject = projects.find((project) => project.name === projectName);
    const index = targetProject.pendingTodos.findIndex((todo) => todo.title === title);
    targetProject.pendingTodos.splice(index, 1);
}

function completeTodo(projectName, title) {
    const targetProject = projects.find((project) => project.name === projectName);
    const index = targetProject.pendingTodos.findIndex((todo) => todo.title === title);
    const [todo] = targetProject.pendingTodos.splice(index, 1);
    targetProject.completedTodos.unshift(todo);
}

function uncompleteTodo(projectName, title) {
    const targetProject = projects.find((project) => project.name === projectName);
    const index = targetProject.completedTodos.findIndex((todo) => todo.title === title);
    const [todo] = targetProject.completedTodos.splice(index, 1);
    targetProject.pendingTodos.unshift(todo);
}

function changeTodoTitle(todo) {
    const newTitle = prompt("Please enter new title");

    if (newTitle === null) {
        return;
    } else {
        todo.title = newTitle;
    }
}

export { createTodo, deleteTodo, completeTodo, uncompleteTodo, changeTodoTitle };