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

export { renderProjects };