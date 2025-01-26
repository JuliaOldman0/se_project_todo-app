import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    addTodoCloseBtn.addEventListener("click", () => {
      addTodoPopup.close();
    });

    addTodoForm.addEventListener("submit", (evt) => {
      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      const id = uuidv4();
      const values = { name, date, id };
      section._renderer(values);

      addTodoPopup.close;

      newTodoValidator.resetValidation();
    });
  },
});

addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todo = generateTodo(item);
      section.addItem(todo);
    },
  },
  ".todos__list"
);

section.renderItems();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
