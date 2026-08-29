import "./styles.css";
import { projects, createProject, deleteProject } from "./projects.js";
import { createToDo, deleteToDo } from "./todos.js";

//testing area
createProject("Tasks");
createToDo("Tasks", "a", "b", "c", "d");
createToDo("Tasks", "e", "f", "g", "h");
deleteToDo("Tasks", "a");
console.log(projects);