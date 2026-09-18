import { 
    projects, 
    deleteProject, 
    changeProjectTitle,
    getPreviousProject,
    setCurrentProject,
    getCurrentProject
} from "./projects.js";
import { 
    deleteTodo, 
    completeTodo, 
    uncompleteTodo, 
    getAdjacentTodo
} from "./todos.js";

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
    const pendingUl = document.getElementById("pending");
    const pendingTodos = project.pendingTodos;
    const completedUl = document.getElementById("completed");
    const completedTodos = project.completedTodos;
    const detailsDiv = document.getElementById("todo-details");
    const titleDiv = document.getElementById("project-title");
    const deleteProjectButton = document.createElement("button");

    setCurrentProject(project);

    pendingUl.innerHTML = "";
    completedUl.innerHTML = "";

    for (let pendingTodo of pendingTodos) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const time = document.createElement("time");
        const button = document.createElement("button");

        checkbox.type = "checkbox";
        span.textContent = pendingTodo.title;
        time.datetime = pendingTodo.dueDate;
        time.textContent = pendingTodo.dueDate;
        button.textContent = pendingTodo.priority;

        li.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(pendingTodo);
        });

        checkbox.addEventListener("change", () => {
            completeTodo(project.uuid, pendingTodo.uuid);
            renderTodos(project);
        });

        makeEditable(
            span,
            () => pendingTodo.title,
            (newValue) => {
                changeProjectTitle(pendingTodo, newValue);
                span.textContent = pendingTodo.title;
                renderTodos(project);
                renderTodoDetails(pendingTodo);
            }
        );

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(time);
        li.appendChild(button);
        pendingUl.appendChild(li);
    }

    for (let completedTodo of completedTodos) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const time = document.createElement("time");
        const button = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = true;
        span.textContent = completedTodo.title;
        time.datetime = completedTodo.dueDate;
        time.textContent = completedTodo.dueDate;
        button.textContent = completedTodo.priority;

        li.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(completedTodo);
        });

        checkbox.addEventListener("change", () => {
            uncompleteTodo(project.uuid, completedTodo.uuid);
            renderTodos(project);
        });

        makeEditable(
            span,
            () => completedTodo.title,
            (newValue) => {
                changeProjectTitle(completedTodo, newValue);
                span.textContent = completedTodo.title;
                renderTodos(project);
                renderTodoDetails(completedTodo);
            }
        );

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(time);
        li.appendChild(button);
        completedUl.appendChild(li);
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