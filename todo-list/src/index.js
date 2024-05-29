/* eslint-disable no-undef */
import "./style.css";
import { Todo } from "./js/todo";
import { Project } from "./js/project";
import { Storage } from "./js/storage";
import dayjs from "dayjs";

var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

class UI {
  static currentProjectId = null;
  static initialTodolist() {
    if (localStorage.getItem("todoList") === null) {
      Storage.setLocalStorage();
      this.initialStorage();
    }
    this.currentProjectId = Storage.getFirstProject().id;
    this.renderLargeProject();

    document.getElementById(this.currentProjectId).classList.add("click-item");
    this.addEventInitial();
    this.renderTodo(Storage.getProjectById(this.currentProjectId).todos);
  }

  static initialStorage() {
    Storage.storeProject(new Project("home"));
    Storage.storeProject(new Project("today"));
    Storage.storeProject(new Project("week"));
  }

  static addEventInitial() {
    this.addSpecificEventClick("plus", () => this.showModalCreate());
    this.addSpecificEventClick("closeModalAdd", () =>
      this.closeModalAdd(event),
    );
    this.addSpecificEventClick("closeModalDetail", () =>
      this.closeModalDetail(event),
    );
    this.addSpecificEventClick("closeModalEdit", () =>
      this.closeModalEdit(event),
    );
    this.addSpecificEventClick("createTodo", () => this.chooseAddNew("todo"));
    this.addSpecificEventClick("createProject", () =>
      this.chooseAddNew("project"),
    );
    document
      .getElementById("form-add-project")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.addProject();
      });
    document
      .getElementById("form-add-todo")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.addTodo();
      });
    document
      .getElementById("form-edit-todo")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.editTodo();
      });

    const arrayClick = document.querySelectorAll(".clickable");
    arrayClick.forEach((element) => {
      this.addSpecificEventClick(element.id, () =>
        this.changeProject(element.id),
      );
    });
    document.querySelectorAll("input[name='priority']").forEach((input) => {
      input.addEventListener("change", () => this.handleCheckRadio(event));
    });
    document.querySelectorAll("input[name='editPriority']").forEach((input) => {
      input.addEventListener("change", () => this.handleCheckRadio(event));
    });
  }

  static handleCheckRadio(event) {
    document.querySelectorAll("input[name='priority']").forEach((input) => {
      input.classList.remove("choose-label-radio");
    });
    document.querySelectorAll("input[name='editPriority']").forEach((input) => {
      input.classList.remove("choose-label-radio");
    });
    document
      .querySelector(`.${event.target.id}`)
      .classList.add("choose-label-radio");
  }

  static addSpecificEventClick(id, functionName) {
    document.getElementById(id).addEventListener("click", functionName);
  }

  static addProject() {
    this.closeModalAdd(event);
    let name = document.getElementById("new-project").value;
    const newProject = new Project(name);
    Storage.storeProject(newProject);
    this.renderProject([newProject]);
    this.resetValueInput();
  }

  static renderLargeProject() {
    const menuProject = document.querySelector(".menu");
    const arrayLargeProject = Storage.getProjects();

    arrayLargeProject.slice(0, 3).forEach((element) => {
      menuProject.innerHTML += `
                    <div class="today item-menu">
                        <div class="text-item clickable" id="${element.id}">
                            ${element.name}
                        </div>
                    </div>
                `;
    });
    menuProject.innerHTML += `
            <div class="project">Project</div>
            <div class="list-project"></div>
            `;
    this.renderProject(arrayLargeProject.slice(3));
  }

  static renderProject(newProject) {
    const listProject = document.querySelector(".list-project");
    newProject.forEach((element) => {
      listProject.innerHTML += `
                <div class="item item-menu">
                    <div class="text-item clickable" id="${element.id}">
                        ${element.name}
                    </div>
                </div>
            `;
    });
    Storage.getProjects().forEach((project) => {
      this.addSpecificEventClick(project.id, () =>
        this.changeProject(project.id),
      );
    });
  }

  static resetValueInput() {
    document.getElementById("newTodo").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    if (document.querySelector('input[name="priority"]:checked')) {
      document.querySelector('input[name="priority"]:checked').checked = false;
    }
    document.getElementById("new-project").value = "";
  }

  static editTodo() {
    this.closeModalEdit(event);
    const id = document.getElementById("id").value;
    const name = document.getElementById("editTodo").value;
    const description = document.getElementById("editDescription").value;
    const date = document.getElementById("editDate").value;
    const priority = document.querySelector(
      'input[name="editPriority"]:checked',
    ).value;
    const todo = { id, name, description, date, priority };
    Storage.editTodo(todo);
    this.renderTodo(Storage.getProjectById(this.currentProjectId).todos);
    this.resetValueInput();
  }

  static addTodo() {
    this.closeModalAdd(event);
    const name = document.getElementById("newTodo").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const priority = document.querySelector(
      'input[name="priority"]:checked',
    ).value;
    const todo = new Todo(
      name,
      description,
      date,
      priority,
      this.currentProjectId,
    );
    Storage.storeTodo(todo, this.currentProjectId);

    this.renderTodo([todo], "new");
    this.resetValueInput();
  }

  static renderTodo(newTodos, key = "old") {
    const listTodo = document.querySelector(".list-todo");
    if (key === "old") {
      listTodo.innerHTML = "";
    }

    newTodos.forEach((element) => {
      listTodo.innerHTML += `
                <div class="item-todo" id="${element.id}">
                    <div class="checkbox"></div>
                    <div class="text-content">${element.name}</div>
                    <button class="btn-detail" >Detail</button>
                    <div class="date">${this.formatDate(element.date)}</div>
                    <img src="../images/edit.svg" class="btn-edit" alt=""/>
                    <img src="../images/delete.svg" class="btn-delete" alt=""/>
                </div>
            `;
      if (element.checked) {
        document.getElementById(element.id).classList.add("item-choose");
      }
      if (element.priority === "low") {
        document.getElementById(element.id).classList.add("border-low");
      } else if (element.priority === "medium") {
        document.getElementById(element.id).classList.add("border-medium");
      } else {
        document.getElementById(element.id).classList.add("border-high");
      }
    });

    Storage.getProjectById(this.currentProjectId).todos.forEach((todo) => {
      this.addSpecificEventClick(todo.id, () =>
        this.handleEventClickTodo(event, todo.id),
      );
    });
  }

  static formatDate(date) {
    return `${dayjs(date).format("ddd, MMM D")}`;
  }

  static handleEventClickTodo(event, id) {
    if (event.target.classList.contains("btn-detail")) {
      this.showDetailTodo(id);
    } else if (event.target.classList.contains("btn-edit")) {
      this.openModalEditTodo(id);
    } else if (event.target.classList.contains("btn-delete")) {
      this.deleteTodo(id);
    } else if (event.target.classList.contains("checkbox")) {
      this.handleCheckOrUncheckTodo(id);
    }
  }

  static openModalEditTodo(id) {
    const todo = Storage.getTodoById(id);
    this.showModalEdit(todo);
  }

  static showDetailTodo(id) {
    const todo = Storage.getTodoById(id);
    this.showModalDetail(todo);
  }

  static deleteTodo(id) {
    Storage.deleteTodo(id);
    this.renderTodo(Storage.getProjectById(this.currentProjectId).todos);
  }

  static handleCheckOrUncheckTodo(id) {
    const toDoElement = document.getElementById(id);
    Storage.updateCheckTodo(id);
    if (toDoElement.classList.contains("item-choose")) {
      toDoElement.classList.remove("item-choose");
    } else {
      toDoElement.classList.add("item-choose");
    }
  }

  static changeProject(id) {
    this.currentProjectId = id;
    this.renderTodo(Storage.getProjectById(id).todos);

    document.querySelectorAll(".text-item").forEach((input) => {
      input.classList.remove("click-item");
    });
    document.getElementById(id).classList.add("click-item");
  }

  static chooseAddNew(key) {
    console.log();
    const formAddTodo = document.getElementById("form-add-todo");
    const formAddProject = document.getElementById("form-add-project");
    const createTodo = document.getElementById("createTodo");
    const createProject = document.getElementById("createProject");
    if (key === "project") {
      formAddProject.classList.remove("hide-div");
      formAddTodo.classList.add("hide-div");
      createTodo.classList.remove("click-item");
      createProject.classList.add("click-item");
    } else {
      formAddTodo.classList.remove("hide-div");
      formAddProject.classList.add("hide-div");
      createTodo.classList.add("click-item");
      createProject.classList.remove("click-item");
    }
  }

  static showModalCreate() {
    const dialog = document.getElementById("dialog");
    dialog.showModal();
    this.chooseAddNew("project");
  }

  static showModalDetail(todo) {
    const dialogDetail = document.getElementById("dialog-detail");
    document.querySelector(".name-detail").innerText = todo.name;
    document.querySelector(".value-project-detail").innerText =
      Storage.getProjectById(this.currentProjectId).name;
    document.querySelector(".value-priority-detail").innerText = todo.priority;
    document.querySelector(".value-date-detail").innerText = this.formatDate(
      todo.date,
    );
    document.querySelector(".value-description-detail").innerText =
      todo.description;
    dialogDetail.showModal();
  }

  static showModalEdit(todo) {
    const dialogEdit = document.getElementById("dialog-edit");
    document.getElementById("id").value = todo.id;
    document.getElementById("editTodo").value = todo.name;
    document.getElementById("editDescription").value = todo.description;
    document.getElementById("editDate").value = todo.date;
    document.querySelector(`[data-id=${todo.priority}]`).checked = true;
    dialogEdit.showModal();
  }

  static closeModalAdd(e) {
    const dialog = document.getElementById("dialog");
    e.preventDefault();
    dialog.close();
  }
  static closeModalDetail(e) {
    const dialogDetail = document.getElementById("dialog-detail");
    e.preventDefault();
    dialogDetail.close();
  }
  static closeModalEdit(e) {
    const dialogEdit = document.getElementById("dialog-edit");
    e.preventDefault();
    dialogEdit.close();
  }
}

UI.initialTodolist();
