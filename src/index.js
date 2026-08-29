import "./styles.css";
import { projects, createProject, deleteProject } from "./projects.js";
import { createTodo, deleteTodo, completeTodo, uncompleteTodo } from "./todos.js";

//testing area
createProject("Tasks");
createProject("Work");
createTodo("Tasks", "a", "1", "2", "3");
createTodo("Tasks", "b", "1", "2", "3");
createTodo("Tasks", "c", "1", "2", "3");
createTodo("Tasks", "d", "1", "2", "3");
completeTodo("Tasks", "a");
completeTodo("Tasks", "d");
uncompleteTodo("Tasks", "d");
console.log(projects);