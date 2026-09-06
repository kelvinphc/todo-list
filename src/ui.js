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
    const projectsDiv = document.getElementById("projects");
    const ul = document.createElement("ul");

    for (let project of projects) {
        const li = document.createElement("li");
        li.textContent = project.title;
        ul.appendChild(li);
    };

    projectsDiv.appendChild(ul);
}

function renderTodos(uuid) {
    const project = projects.find(project => project.uuid === uuid);
    const pendingDiv = document.getElementById("pending");
    const pendingUl = document.createElement("ul");
    const pendingTodos = project.pendingTodos;
    const completedDiv = document.getElementById("completed");
    const completedUl = document.createElement("ul");
    const completedTodos = project.completedTodos;

    for (let pendingTodo of pendingTodos) {
        const li = document.createElement("li");
        li.textContent = pendingTodo.title;
        pendingUl.appendChild(li);
    };

    for (let completedTodo of completedTodos) {
        const li = document.createElement("li");
        li.textContent = completedTodo.title;
        completedUl.appendChild(li);
    };

    pendingDiv.appendChild(pendingUl);
    completedDiv.appendChild(completedUl);
}

function renderTodoDetails(uuid) {

}

export { 
    renderProjects,
    renderTodos,
 };