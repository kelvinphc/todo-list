import "./styles.css";
import { 
    projects, 
    currentProject,
    createProject, 
    deleteProject, 
    changeProjectTitle,
    saveProjects,
    loadProjects,
    getPreviousProject,
    setCurrentProject,
    getCurrentProject
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
import { 
    renderProjects,
    renderTodos,
    renderTodoDetails,
    makeEditable
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