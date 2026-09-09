import { 
    projects, 
    createProject, 
    deleteProject, 
    changeProjectTitle,
    saveProjects,
    loadProjects
} from "./projects.js";
import { 
    createTodo, 
    deleteTodo, 
    completeTodo, 
    uncompleteTodo, 
    changeTodoTitle, 
    changeTodoDescription, 
    changeTodoDueDate,
    changeTodoPriority
} from "./todos.js";

function renderProjects() {
    const nav = document.getElementById("projects");

    for (let project of projects) {
        const button = document.createElement("button");
        button.textContent = project.title;

        button.addEventListener("click", () => {
            const uuid = project.uuid;
            
            renderTodos(uuid);
        })

        nav.appendChild(button);
    }
}

function renderTodos(uuid) {
    const project = projects.find(project => project.uuid === uuid);
    const title = document.querySelector("h1");
    const pendingDiv = document.getElementById("pending");
    const pendingTodos = project.pendingTodos;
    const completedDiv = document.getElementById("completed");
    const completedTodos = project.completedTodos;

    pendingDiv.innerHTML = "";
    completedDiv.innerHTML = "";

    for (let pendingTodo of pendingTodos) {
        const button = document.createElement("button");
        button.textContent = pendingTodo.title;
        pendingDiv.appendChild(button);
    }

    for (let completedTodo of completedTodos) {
        const button = document.createElement("button");
        button.textContent = completedTodo.title;
        completedDiv.appendChild(button);
    }

    title.textContent = project.title;
}

function renderTodoDetails(todo) {
    const title = todo.title;
    const description = todo.description;
    const dueDate = todo.dueDate;
    const priority = todo.priority;
    const div = document.getElementById("todo-details");

    const titleButton = document.createElement("button");
    titleButton.textContent = title;
    div.appendChild(titleButton);

    const descriptionButton = document.createElement("button");
    descriptionButton.textContent = description;
    div.appendChild(descriptionButton);

    const dueDateButton = document.createElement("button");
    dueDateButton.textContent = dueDate;
    div.appendChild(dueDateButton);

    const priorityButton = document.createElement("button");
    priorityButton.textContent = priority;
    div.appendChild(priorityButton);
}

export { 
    renderProjects,
    renderTodos,
    renderTodoDetails
 };