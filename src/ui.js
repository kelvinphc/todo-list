import { 
    projects, 
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
    changeTodoPriority,
    getAdjacentTodo
} from "./todos.js";
import { 
    notifyChange
} from "./events.js";

function renderProjects() {
    const projectsUl = document.getElementById("projects");
    const detailsDiv = document.getElementById("todo-details");

    projectsUl.innerHTML = "";

    for (let project of projects) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = project.title;

        button.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodos(project);
        });

        li.appendChild(button);
        projectsUl.appendChild(li);
    }
}

function renderTodos(project) {
    const title = document.querySelector("h1");
    const pendingDiv = document.getElementById("pending");
    const pendingTodos = project.pendingTodos;
    const completedDiv = document.getElementById("completed");
    const completedTodos = project.completedTodos;
    const detailsDiv = document.getElementById("todo-details");
    const titleDiv = document.getElementById("project-title");
    const deleteProjectButton = document.createElement("button");

    setCurrentProject(project);

    pendingDiv.innerHTML = "";
    completedDiv.innerHTML = "";

    for (let pendingTodo of pendingTodos) {
        const button = document.createElement("button");
        button.textContent = pendingTodo.title;

        button.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(pendingTodo);
        });

        pendingDiv.appendChild(button);
    }

    for (let completedTodo of completedTodos) {
        const button = document.createElement("button");
        button.textContent = completedTodo.title;

        button.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(completedTodo);
        });

        completedDiv.appendChild(button);
    }

    deleteProjectButton.textContent = "Delete Project";
    title.textContent = project.title;
    titleDiv.innerHTML = "";
    titleDiv.appendChild(title);
    if (project !== projects[0]) titleDiv.appendChild(deleteProjectButton);

    deleteProjectButton.addEventListener("click", () => {
        const previousProject = getPreviousProject(project.uuid);
        deleteProject(project.uuid);
        renderProjects();
        if (previousProject) renderTodos(previousProject);
    });

    if (project === projects[0]) {
        title.onclick = null;
        return;
    }

    makeEditable(
        title,
        () => project.title,
        (newValue) => {
            changeProjectTitle(project, newValue);
            title.textContent = project.title;
            renderProjects();
        }
    );
}

function renderTodoDetails(todo) {
    const title = todo.title;
    const description = todo.description;
    const dueDate = todo.dueDate;
    const priority = todo.priority;
    const completed = todo.completed;
    const div = document.getElementById("todo-details");
    const project = getCurrentProject();
    let adjacentTodo;

    div.innerHTML = "";

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

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Todo";
    deleteButton.addEventListener("click", () => {
        if (completed === false) {
            adjacentTodo = getAdjacentTodo(project.pendingTodos, todo.uuid);
        } else {
            adjacentTodo = getAdjacentTodo(project.completedTodos, todo.uuid);
        }

        deleteTodo(project.uuid, todo.uuid);
        renderTodos(project);
        if (adjacentTodo !== undefined) {
            renderTodoDetails(adjacentTodo);
        } else {
            div.innerHTML = "";
        }
    });
    div.appendChild(deleteButton);
}

function makeEditable(element, getValue, onSave) {
    element.onclick = () => {
        const input = document.createElement("input");
        input.value = getValue();

        element.replaceWith(input);
        input.focus();

        input.addEventListener("blur", () => {
            onSave(input.value);
            input.replaceWith(element);
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                input.blur();
            }
        });
    };
}

export { 
    renderProjects,
    renderTodos,
    renderTodoDetails,
    makeEditable
 };