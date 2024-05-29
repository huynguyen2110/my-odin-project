export class Storage {
  static arrayStore = [];

  static getLocalStorage() {
    // eslint-disable-next-line no-undef
    return JSON.parse(localStorage.getItem("todoList"));
  }

  static setLocalStorage(array = []) {
    // eslint-disable-next-line no-undef
    return localStorage.setItem("todoList", JSON.stringify(array));
  }

  static getFirstProject() {
    return this.getLocalStorage()[0];
  }

  static storeProject(project) {
    const arrayStore = this.getLocalStorage();
    arrayStore.push(project);
    this.setLocalStorage(arrayStore);
  }

  static getProjects() {
    return this.getLocalStorage();
  }

  static getProjectById(id) {
    const arrayStore = this.getLocalStorage();
    return arrayStore.find((project) => project.id === id);
  }

  static storeTodo(todo, idProject) {
    const projectChange = this.getProjectById(idProject);
    projectChange.todos.push(todo);
    const arrayStore = this.getLocalStorage();
    const newArray = arrayStore.map((project) =>
      project.id === idProject ? projectChange : project,
    );
    this.setLocalStorage(newArray);
  }

  static getTodos() {
    const arrayTodos = [];
    const arrayStore = this.getLocalStorage();
    arrayStore.forEach((project) => {
      arrayTodos.push(...project.todos);
    });
    return arrayTodos;
  }

  static getTodoById(id) {
    return this.getTodos().find((todo) => todo.id === id);
  }

  static updateCheckTodo(id) {
    const todoUpdate = this.getTodoById(id);
    todoUpdate.checked = !todoUpdate.checked;
    let projectUpdate = this.getProjectById(todoUpdate.projectId);
    projectUpdate = {
      ...projectUpdate,
      todos: projectUpdate.todos.map((todo) =>
        todo.id === id ? todoUpdate : todo,
      ),
    };
    const arrayStore = this.getLocalStorage();
    const array = arrayStore.map((project) =>
      project.id === todoUpdate.projectId ? projectUpdate : project,
    );
    this.setLocalStorage(array);
  }

  static deleteTodo(id) {
    const todoDelete = this.getTodoById(id);
    let projectUpdate = this.getProjectById(todoDelete.projectId);
    projectUpdate = {
      ...projectUpdate,
      todos: projectUpdate.todos.filter((todo) => todo.id !== id),
    };
    const arrayStore = this.getLocalStorage();
    const array = arrayStore.map((project) =>
      project.id === todoDelete.projectId ? projectUpdate : project,
    );
    this.setLocalStorage(array);
  }

  static editTodo({ id, name, description, date, priority }) {
    let todoEdit = this.getTodoById(id);
    todoEdit = { ...todoEdit, name, description, date, priority };
    let projectUpdate = this.getProjectById(todoEdit.projectId);
    projectUpdate = {
      ...projectUpdate,
      todos: projectUpdate.todos.map((todo) =>
        todo.id === id ? todoEdit : todo,
      ),
    };
    const arrayStore = this.getLocalStorage();
    const array = arrayStore.map((project) =>
      project.id === todoEdit.projectId ? projectUpdate : project,
    );
    this.setLocalStorage(array);
  }
}
