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
    const div = document.getElementById("projects");
    const ul = document.createElement("ul");

    for (let project of projects) {
        const li = document.createElement("li");
        li.textContent = project.title;
        ul.appendChild(li);
    };

    div.appendChild(ul);
}

function renderTodos(uuid) {
    const project = projects.find(project => project.uuid === uuid);
    const title = document.querySelector("h1");
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

    title.textContent = project.title;
    pendingDiv.appendChild(pendingUl);
    completedDiv.appendChild(completedUl);
}

function renderTodoDetails(todo) {
    const title = todo.title;
    const description = todo.description;
    const dueDate = todo.dueDate;
    const priority = todo.priority;
    const div = document.getElementById("todo-details");
    const ul = document.createElement("ul");

    const titleLi = document.createElement("li");
    titleLi.textContent = title;
    ul.appendChild(titleLi);

    const descriptionLi = document.createElement("li");
    descriptionLi.textContent = description;
    ul.appendChild(descriptionLi);

    const dueDateLi = document.createElement("li");
    dueDateLi.textContent = dueDate;
    ul.appendChild(dueDateLi);

    const priorityLi = document.createElement("li");
    priorityLi.textContent = priority;
    ul.appendChild(priorityLi);

    div.appendChild(ul);
}

export { 
    renderProjects,
    renderTodos,
    renderTodoDetails
 };