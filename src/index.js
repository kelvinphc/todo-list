import "./styles.css";
import { projects, createProject, deleteProject } from "./projects.js";
import { createTodo, deleteTodo, completeTodo, uncompleteTodo, changeTodoTitle } from "./todos.js";

//testing area
const myTodo = { title: "Old title", description: "", dueDate: "", priority: "" };
console.log(myTodo);
changeTodoTitle(myTodo);
console.log(myTodo);