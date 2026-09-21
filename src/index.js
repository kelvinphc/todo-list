import "./styles.css";
import { 
    createProject, 
    saveProjects,
    loadProjects,
    getCurrentProject
} from "./projects.js";
import { 
    createTodo,
} from "./todos.js";
import { 
    renderProjects,
    renderTodos,
} from "./ui.js";
import { 
    onChange 
} from "./events.js";

onChange(() => saveProjects());

loadProjects();
renderProjects();

const addProjectButton = document.getElementById("add-project");
const addTodoButton = document.getElementById("add-todo-button");
const addTodoInput = document.getElementById("add-todo-input");

addProjectButton.addEventListener("click", () => {
    createProject();
    renderProjects();
});

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