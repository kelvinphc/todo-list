import "./styles.css";
import {
    projects,
    createProject, 
    saveProjects,
    loadProjects,
    getCurrentProject
} from "./projects.js";
import { 
    createTodo
} from "./todos.js";
import {
    renderTodosDueToday,
    renderHighPriorityTodos,
    renderPlannedTodos,
    renderProjects,
    renderTodos,
} from "./ui.js";
import { 
    onChange 
} from "./events.js";

onChange(() => saveProjects());

loadProjects();
renderProjects();

const detailsDiv = document.getElementById("todo-details");

const addProjectButton = document.getElementById("add-project");

addProjectButton.addEventListener("click", () => {
    createProject();
    renderProjects();
});

const addTodoButton = document.getElementById("add-todo-button");
const addTodoInput = document.getElementById("add-todo-input");

function handleAddTodo() {
    const project = getCurrentProject();
    if (!project) return;
    if (addTodoInput.value.trim() === "") return;

    createTodo(project.uuid, addTodoInput.value);
    addTodoInput.value = "";
    renderTodos(project);
}

addTodoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleAddTodo();
    }
});

addTodoButton.addEventListener("click", handleAddTodo);

const tasksButton = document.getElementById("tasks");

tasksButton.addEventListener("click", () => {
    detailsDiv.innerHTML = "";
    renderTodos(projects[0]);
});

const todayButton = document.getElementById("today");

todayButton.addEventListener("click", () => {
    renderTodosDueToday();
});

const highPriorityButton = document.getElementById("high-priority");

highPriorityButton.addEventListener("click", () => {
    renderHighPriorityTodos();
});

const plannedButton = document.getElementById("planned");

plannedButton.addEventListener("click", () => {
    renderPlannedTodos();
});