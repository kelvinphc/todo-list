import "./styles.css";
import { projects, createProject, deleteProject } from "./projects.js";
import { createTodo, deleteTodo, completeTodo } from "./todos.js";

//testing area
createProject("Tasks");
createProject("Work");
createTodo("Tasks", "a", "b", "c", "d");
createTodo("Tasks", "e", "f", "g", "h");
createTodo("Tasks", "i", "j", "k", "l");
completeTodo("Tasks", "a");
completeTodo("Tasks", "e");
console.log(projects);