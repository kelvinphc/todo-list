import { projects } from "./projects.js";
import { notifyChange } from "./events.js";
import { 
    isToday,
    toDate
 } from "date-fns";

function createTodo(projectUuid, title) {
    const todo = {
        uuid: crypto.randomUUID(),
        title,
        description: "",
        dueDate: "",
        priority: "Low",
        completed: false
    };

    const targetProject = projects.find((project) => project.uuid === projectUuid);
    targetProject.pendingTodos.push(todo);
    notifyChange();
}

function deleteTodo(projectUuid, uuid) {
    const targetProject = projects.find((project) => project.uuid === projectUuid);

    let index = targetProject.pendingTodos.findIndex((todo) => todo.uuid === uuid);
    if (index !== -1) {
        targetProject.pendingTodos.splice(index, 1);
        notifyChange();
        return
    }

    index = targetProject.completedTodos.findIndex((todo) => todo.uuid === uuid);
    targetProject.completedTodos.splice(index, 1);
    notifyChange();
}

function completeTodo(projectUuid, uuid) {
    const targetProject = projects.find((project) => project.uuid === projectUuid);
    const index = targetProject.pendingTodos.findIndex((todo) => todo.uuid === uuid);
    const [todo] = targetProject.pendingTodos.splice(index, 1);
    todo.completed = true;
    targetProject.completedTodos.unshift(todo);
    notifyChange();
}

function uncompleteTodo(projectUuid, uuid) {
    const targetProject = projects.find((project) => project.uuid === projectUuid);
    const index = targetProject.completedTodos.findIndex((todo) => todo.uuid === uuid);
    const [todo] = targetProject.completedTodos.splice(index, 1);
    todo.completed = false;
    targetProject.pendingTodos.unshift(todo);
    notifyChange();
}

function changeTodoTitle(todo, newTitle) {
    if (newTitle.trim() !== "") {
        todo.title = newTitle;
        notifyChange();
    }
}

function changeTodoDescription(todo, newDescription) {
    if (newDescription !== null) {
        todo.description = newDescription;
    }
    notifyChange();
}

function changeTodoDueDate(todo, newDueDate) {
    todo.dueDate = newDueDate;
    notifyChange();
}

function changeTodoPriority(todo) {
    todo.priority = todo.priority === "High" ? "Low" : "High";
    notifyChange();
}

function getAdjacentTodo(list, uuid, getUuid = (item) => item.uuid) {
    const index = list.findIndex((item) => getUuid(item) === uuid);
    if (list.length === index + 1) return list[index - 1];
    return list[index + 1];
}

function getTodosDueToday() {
    const dueToday = [];

    for (let project of projects) {
        project.pendingTodos.filter((todo) => {
            if (isToday(toDate(todo.dueDate))) dueToday.push({ project, todo });
        });
    }

    return dueToday;
}

export { 
    createTodo, 
    deleteTodo, 
    completeTodo, 
    uncompleteTodo, 
    changeTodoTitle, 
    changeTodoDescription, 
    changeTodoDueDate,
    changeTodoPriority,
    getAdjacentTodo,
    getTodosDueToday
};