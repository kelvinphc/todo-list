import "./styles.css";
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
import { 
    renderProjects,
    renderTodos,
    renderTodoDetails
} from "./ui.js";
import { 
    onChange 
} from "./events.js";

onChange(() => saveProjects());

loadProjects();
renderProjects();

const addProjectButton = document.getElementById("add-project");
const deleteProjectButton = document.getElementById("delete-project");
const nav = document.getElementById("projects");

addProjectButton.addEventListener("click", () => {
    createProject();
    renderProjects();
});

deleteProjectButton.addEventListener("click", (e) => {
    const uuid = e.target.dataset.uuid;
    if (!uuid) return;
    deleteProject(uuid);
    renderProjects();
});

//testing area
console.log(projects);