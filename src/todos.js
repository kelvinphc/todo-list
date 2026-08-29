function createToDo(project, title, description, dueDate, priority) {
    const todo = {
        title,
        description,
        dueDate,
        priority
    };

    return todo;
}

export { createToDo };