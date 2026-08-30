import { projects } from "./projects.js";

function createTodo(projectTitle, title, description, dueDate, priority) {
    const todo = {
        title,
        description,
        dueDate,
        priority
    };

    const targetProject = projects.find((project) => project.title === projectTitle);
    targetProject.pendingTodos.push(todo);
}

function deleteTodo(projectTitle, title) {
    const targetProject = projects.find((project) => project.title === projectTitle);
    const index = targetProject.pendingTodos.findIndex((todo) => todo.title === title);
    targetProject.pendingTodos.splice(index, 1);
}

function completeTodo(projectTitle, title) {
    const targetProject = projects.find((project) => project.title === projectTitle);
    const index = targetProject.pendingTodos.findIndex((todo) => todo.title === title);
    const [todo] = targetProject.pendingTodos.splice(index, 1);
    targetProject.completedTodos.unshift(todo);
}

function uncompleteTodo(projectTitle, title) {
    const targetProject = projects.find((project) => project.title === projectTitle);
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

function changeTodoDescription(todo) {
    const newDescription = prompt("Please enter new description");

    if (newDescription === null) {
        return;
    } else {
        todo.description = newDescription;
    }
}

function changeTodoPriority(todo) {
    todo.priorty = todo.priority === "High" ? "Low" : "High";
}

export { 
    createTodo, 
    deleteTodo, 
    completeTodo, 
    uncompleteTodo, 
    changeTodoTitle, 
    changeTodoDescription, 
    changeTodoPriority
};