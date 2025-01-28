import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(data) {
  if (data.completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

function handleCounterUpdate(data, isIncrement) {
  if (data.completed) {
    todoCounter.updateCompleted(isIncrement);
  }
  todoCounter.updateTotal(isIncrement);
}

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id, completed: false };

    handleCounterUpdate(values, true);

    renderTodo(values);

    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  return new Todo(data, "#todo-template", handleCheck, handleDelete).getView();
};

const section = new Section(
  {
    items: initialTodos,
    renderer: renderTodo,
  },
  ".todos__list"
);

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
