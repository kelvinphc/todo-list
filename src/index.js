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

//testing area
