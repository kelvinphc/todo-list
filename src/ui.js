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
    changeTodoDescription,
    changeTodoDueDate,
    changeTodoPriority,
    getAdjacentTodo,
    getTodosDueToday,
    getHighPriorityTodos
} from "./todos.js";
import { format } from "date-fns";

let refreshMainView = () => {};
let getAdjacentInView = () => undefined;

function setMainView(renderFn, getAdjacentFn) {
    refreshMainView = renderFn;
    getAdjacentInView = getAdjacentFn;
}

function renderTodosDueToday() {
    const todosDueToday = getTodosDueToday();
    setMainView(
        renderTodosDueToday,
        (todo) => getAdjacentTodo(todosDueToday, todo.uuid, (item) => item.todo.uuid)
    );
    const title = document.querySelector("h1");
    const completedH2 = document.querySelector("h2");
    const pendingUl = document.getElementById("pending");
    const completedUl = document.getElementById("completed");
    const detailsDiv = document.getElementById("todo-details");
    const titleDiv = document.getElementById("project-title");
    const addTodoButton = document.getElementById("add-todo-button");
    const addTodoInput = document.getElementById("add-todo-input");

    addTodoButton.style.display = "none";
    addTodoInput.style.display = "none";
    pendingUl.innerHTML = "";
    completedUl.innerHTML = "";

    for (let todoDueToday of todosDueToday) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const titleSpan = document.createElement("span");
        const projectSpan = document.createElement("span");
        const button = document.createElement("button");

        checkbox.type = "checkbox";
        titleSpan.textContent = todoDueToday.todo.title;
        projectSpan.textContent = todoDueToday.project.title;
        projectSpan.classList.add("project-span");
        button.textContent = todoDueToday.todo.priority;

        li.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(todoDueToday.todo, todoDueToday.project);
        });

        checkbox.addEventListener("change", () => {
            completeTodo(todoDueToday.project.uuid, todoDueToday.todo.uuid);
            refreshMainView();
            renderTodoDetails(todoDueToday.todo, todoDueToday.project);
        });

        makeEditable(
            titleSpan,
            () => todoDueToday.todo.title,
            (newValue) => {
                changeTodoTitle(todoDueToday.todo, newValue);
                titleSpan.textContent = todoDueToday.project.title;
                refreshMainView();
                renderTodoDetails(todoDueToday.todo, todoDueToday.project);
            }
        );

        button.addEventListener("click", () => {
            changeTodoPriority(todoDueToday.todo);
            refreshMainView();
            renderTodoDetails(todoDueToday.todo, todoDueToday.project);
        });

        li.appendChild(checkbox);
        li.appendChild(titleSpan);
        li.appendChild(projectSpan);
        li.appendChild(button);
        pendingUl.appendChild(li);
    }

    completedH2.style.display = "none";
    title.textContent = "Today";
    titleDiv.innerHTML = "";
    titleDiv.appendChild(title);
}

function renderHighPriorityTodos() {
    const highPriorityTodos = getHighPriorityTodos();
    setMainView(
        renderHighPriorityTodos,
        (todo) => getAdjacentTodo(highPriorityTodos, todo.uuid, (item) => item.todo.uuid)
    );
    const title = document.querySelector("h1");
    const completedH2 = document.querySelector("h2");
    const pendingUl = document.getElementById("pending");
    const completedUl = document.getElementById("completed");
    const detailsDiv = document.getElementById("todo-details");
    const titleDiv = document.getElementById("project-title");
    const addTodoButton = document.getElementById("add-todo-button");
    const addTodoInput = document.getElementById("add-todo-input");

    addTodoButton.style.display = "none";
    addTodoInput.style.display = "none";
    pendingUl.innerHTML = "";
    completedUl.innerHTML = "";

    for (let highPriorityTodo of highPriorityTodos) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const titleSpan = document.createElement("span");
        const projectSpan = document.createElement("span");
        const button = document.createElement("button");

        checkbox.type = "checkbox";
        titleSpan.textContent = highPriorityTodo.todo.title;
        projectSpan.textContent = highPriorityTodo.project.title;
        projectSpan.classList.add("project-span");
        button.textContent = highPriorityTodo.todo.priority;

        li.addEventListener("click", () => {
            detailsDiv.innerHTML = "";
            renderTodoDetails(highPriorityTodo.todo, highPriorityTodo.project);
        });

        checkbox.addEventListener("change", () => {
            completeTodo(highPriorityTodo.project.uuid, highPriorityTodo.todo.uuid);
            refreshMainView();
            renderTodoDetails(highPriorityTodo.todo, highPriorityTodo.project);
        });

        makeEditable(
            titleSpan,
            () => highPriorityTodo.todo.title,
            (newValue) => {
                changeTodoTitle(highPriorityTodo.todo, newValue);
                titleSpan.textContent = highPriorityTodo.project.title;
                refreshMainView();
                renderTodoDetails(highPriorityTodo.todo, highPriorityTodo.project);
            }
        );

        button.addEventListener("click", () => {
            changeTodoPriority(highPriorityTodo.todo);
            refreshMainView();
            renderTodoDetails(highPriorityTodo.todo, highPriorityTodo.project);
        });

        li.appendChild(checkbox);
        li.appendChild(titleSpan);
        li.appendChild(projectSpan);
        li.appendChild(button);
        pendingUl.appendChild(li);
    }

    completedH2.style.display = "none";
    title.textContent = "High Priority";
    titleDiv.innerHTML = "";
    titleDiv.appendChild(title);
}

function renderProjects() {
    const projectsUl = document.getElementById("projects");
    const detailsDiv = document.getElementById("todo-details");

    projectsUl.innerHTML = "";

    for (let project of projects) {
        if (project === projects[0]) continue;
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
    setMainView(
        () => renderTodos(project),
        (todo) => {
            const list = todo.completed ? project.completedTodos : project.pendingTodos;
            const adjacentTodo = getAdjacentTodo(list, todo.uuid);
            return adjacentTodo ? { todo: adjacentTodo, project } : undefined;
        }
    );
    const title = document.querySelector("h1");
    const completedH2 = document.querySelector("h2");
    const pendingUl = document.getElementById("pending");
    const pendingTodos = project.pendingTodos;
    const completedUl = document.getElementById("completed");
    const completedTodos = project.completedTodos;
    const detailsDiv = document.getElementById("todo-details");
    const titleDiv = document.getElementById("project-title");
    const deleteProjectButton = document.createElement("button");
    const addTodoButton = document.getElementById("add-todo-button");
    const addTodoInput = document.getElementById("add-todo-input");

    addTodoButton.style.display = "";
    addTodoInput.style.display = "";

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
            renderTodoDetails(pendingTodo, project);
        });

        checkbox.addEventListener("change", () => {
            completeTodo(project.uuid, pendingTodo.uuid);
            refreshMainView();
            renderTodoDetails(pendingTodo, project);
        });

        makeEditable(
            span,
            () => pendingTodo.title,
            (newValue) => {
                changeTodoTitle(pendingTodo, newValue);
                span.textContent = pendingTodo.title;
                refreshMainView();
                renderTodoDetails(pendingTodo, project);
            }
        );

        button.addEventListener("click", () => {
            changeTodoPriority(pendingTodo);
            refreshMainView();
            renderTodoDetails(pendingTodo, project);
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
            renderTodoDetails(completedTodo, project);
        });

        checkbox.addEventListener("change", () => {
            uncompleteTodo(project.uuid, completedTodo.uuid);
            refreshMainView();
            renderTodoDetails(completedTodo, project);
        });

        makeEditable(
            span,
            () => completedTodo.title,
            (newValue) => {
                changeTodoTitle(completedTodo, newValue);
                span.textContent = completedTodo.title;
                refreshMainView();
                renderTodoDetails(completedTodo, project);
            }
        );

        button.addEventListener("click", () => {
            changeTodoPriority(completedTodo);
            refreshMainView();
            renderTodoDetails(completedTodo, project);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(time);
        li.appendChild(button);
        completedUl.appendChild(li);
    }

    completedH2.style.display = completedTodos.length > 0 ? "" : "none";

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

function renderTodoDetails(todo, project) {
    const title = todo.title;
    const description = todo.description;
    const dueDate = todo.dueDate;
    const priority = todo.priority;
    const completed = todo.completed;
    const div = document.getElementById("todo-details");

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

        refreshMainView();
        renderTodoDetails(todo, project);
    });

    makeEditable(
        titleSpan,
        () => todo.title,
        (newValue) => {
            changeTodoTitle(todo, newValue);
            titleSpan.textContent = todo.title;
            refreshMainView();
            renderTodoDetails(todo, project);
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
        refreshMainView();
        renderTodoDetails(todo, project);
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
        refreshMainView();
        renderTodoDetails(todo, project);
    });

    dueDateDiv.appendChild(dueDateSpan);
    dueDateDiv.appendChild(dueDateInput);
    div.appendChild(dueDateDiv);

    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.rows = 5;
    descriptionTextarea.placeholder = "Add description";
    descriptionTextarea.value = description;

    descriptionTextarea.addEventListener("blur", () => {
        changeTodoDescription(todo, descriptionTextarea.value);
        renderTodoDetails(todo, project);
    });

    descriptionTextarea.addEventListener("input", () => {
        autoResize(descriptionTextarea);
    });

    div.appendChild(descriptionTextarea);
    autoResize(descriptionTextarea);

    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-todo";
    deleteButton.textContent = "Delete Todo";
    deleteButton.addEventListener("click", () => {
        const adjacentItem = getAdjacentInView(todo);

        deleteTodo(project.uuid, todo.uuid);
        refreshMainView();
        if (adjacentItem !== undefined) {
            renderTodoDetails(adjacentItem.todo, adjacentItem.project);
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

function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

export {
    renderTodosDueToday,
    renderHighPriorityTodos,
    renderProjects,
    renderTodos,
    renderTodoDetails,
    makeEditable
 };