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

//testing area
loadProjects();
renderProjects();
renderTodos("d036347f-cee8-404e-ae3d-01b047834cc5");
renderTodoDetails({uuid: '565860a7-5212-4207-ae2f-1d44e15eebbf', title: 'a', description: '1', dueDate: '2', priority: '3'});
console.log(projects);