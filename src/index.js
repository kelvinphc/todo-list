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

} from "./ui.js";

//testing area
createProject("Tasks");
createProject("Work");
createProject("Personal");
createTodo("Work", "a", "1", "2", "3");
createTodo("Work", "b", "1", "2", "3");
createTodo("Work", "c", "1", "2", "3");
createTodo("Work", "d", "1", "2", "3");
completeTodo("Work", "a");
completeTodo("Work", "b");

renderProjects();
renderTodos("Work");