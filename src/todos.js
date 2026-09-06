import { projects } from "./projects.js";
import { compareAsc, format } from "date-fns";

function createTodo(projectUuid, title, description, dueDate, priority) {
    const todo = {
        uuid: crypto.randomUUID(),
        title,
        description,
        dueDate,
        priority
    };

    const targetProject = projects.find((project) => project.uuid === projectUuid);
    targetProject.pendingTodos.push(todo);
}

function deleteTodo(projectUuid, uuid) {
    const targetProject = projects.find((project) => project.uuid === projectUuid);
    const index = targetProject.pendingTodos.findIndex((todo) => todo.uuid === uuid);
    targetProject.pendingTodos.splice(index, 1);
}

function completeTodo(projectUuid, uuid) {
    const targetProject = projects.find((project) => project.uuid === projectUuid);
    const index = targetProject.pendingTodos.findIndex((todo) => todo.uuid === uuid);
    const [todo] = targetProject.pendingTodos.splice(index, 1);
    targetProject.completedTodos.unshift(todo);
}

function uncompleteTodo(projectUuid, uuid) {
    const targetProject = projects.find((project) => project.uuid === projectUuid);
    const index = targetProject.completedTodos.findIndex((todo) => todo.uuid === uuid);
    const [todo] = targetProject.completedTodos.splice(index, 1);
    targetProject.pendingTodos.unshift(todo);
}

function changeTodoTitle(todo) {
    const newTitle = prompt("Please enter new title");

    if (newTitle !== null) {
        todo.title = newTitle;
    }
}

function changeTodoDescription(todo) {
    const newDescription = prompt("Please enter new description");

    if (newDescription !== null) {
        todo.description = newDescription;
    }
}

function changeTodoDueDate(todo, newDueDate) {
    todo.dueDate = newDueDate;
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
    changeTodoDueDate,
    changeTodoPriority
};