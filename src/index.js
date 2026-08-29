import "./styles.css";
import { projects, createProject, deleteProject } from "./projects.js";
import { createToDo } from "./todos.js";

//testing area
createProject("Tasks");
createProject("Work");
createProject("Holiday");
console.log(projects);
deleteProject("Holiday");
console.log(projects);