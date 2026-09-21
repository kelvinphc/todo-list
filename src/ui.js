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
    changeTodoTitle,
    changeTodoDueDate,
    changeTodoPriority,
    getAdjacentTodo
} from "./todos.js";
import { format } from "date-fns";

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
        if (pendingTodo.dueDate !== "") time.textContent = format(pendingTodo.dueDate, "EEE',' d MMM yyyy");
        button.textContent = pendingTodo.priority;

        li.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(pendingTodo);
        });

        checkbox.addEventListener("change", () => {
            completeTodo(project.uuid, pendingTodo.uuid);
            renderTodos(project);
            renderTodoDetails(pendingTodo);
        });

        makeEditable(
            span,
            () => pendingTodo.title,
            (newValue) => {
                changeTodoTitle(pendingTodo, newValue);
                span.textContent = pendingTodo.title;
                renderTodos(project);
                renderTodoDetails(pendingTodo);
            }
        );

        button.addEventListener("click", () => {
            changeTodoPriority(pendingTodo);
            renderTodos(project);
            renderTodoDetails(pendingTodo);
        });

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
        if (completedTodo.dueDate !== "") time.textContent = format(completedTodo.dueDate, "EEE',' d MMM yyyy");
        button.textContent = completedTodo.priority;

        li.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(completedTodo);
        });

        checkbox.addEventListener("change", () => {
            uncompleteTodo(project.uuid, completedTodo.uuid);
            renderTodos(project);
            renderTodoDetails(completedTodo);
        });

        makeEditable(
            span,
            () => completedTodo.title,
            (newValue) => {
                changeTodoTitle(completedTodo, newValue);
                span.textContent = completedTodo.title;
                renderTodos(project);
                renderTodoDetails(completedTodo);
            }
        );

        button.addEventListener("click", () => {
            changeTodoPriority(completedTodo);
            renderTodos(project);
            renderTodoDetails(completedTodo);
        });

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

    const titleDiv = document.createElement("div");
    const titleCheckbox = document.createElement("input");
    const titleSpan = document.createElement("span");
    titleCheckbox.type = "checkbox";
    if (completed === true) titleCheckbox.checked = true;
    titleSpan.textContent = title;
    titleDiv.appendChild(titleCheckbox);
    titleDiv.appendChild(titleSpan);

    titleCheckbox.addEventListener("change", () => {
        if (completed === false) {
            completeTodo(project.uuid, todo.uuid);

        } else {
            uncompleteTodo(project.uuid, todo.uuid);
        }

        renderTodos(project);
        renderTodoDetails(todo);
    });

    makeEditable(
        titleSpan,
        () => todo.title,
        (newValue) => {
            changeTodoTitle(todo, newValue);
            titleSpan.textContent = todo.title;
            renderTodos(project);
            renderTodoDetails(todo);
        }
    );

    div.appendChild(titleDiv);

    const priorityDiv = document.createElement("div");
    const prioritySpan = document.createElement("span");
    const priorityButton = document.createElement("button");
    prioritySpan.textContent = "Priority: ";
    priorityButton.textContent = priority;

    priorityButton.addEventListener("click", () => {
        changeTodoPriority(todo);
        renderTodos(project);
        renderTodoDetails(todo);
    });

    priorityDiv.appendChild(prioritySpan);
    priorityDiv.appendChild(priorityButton);
    div.appendChild(priorityDiv);

    const dueDateDiv = document.createElement("div");
    const dueDateSpan = document.createElement("span");
    const dueDateInput = document.createElement("input");
    dueDateSpan.textContent = "Due date: ";
    dueDateInput.type = "date";
    dueDateInput.value = dueDate;

    dueDateInput.addEventListener("change", () => {
        changeTodoDueDate(todo, dueDateInput.value);
        renderTodos(project);
        renderTodoDetails(todo);
    });

    dueDateDiv.appendChild(dueDateSpan);
    dueDateDiv.appendChild(dueDateInput);
    div.appendChild(dueDateDiv);

    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.placeholder = "Add description";
    div.appendChild(descriptionTextarea);

    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-todo";
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