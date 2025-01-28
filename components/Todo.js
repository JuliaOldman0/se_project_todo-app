class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;

    if (!this._templateElement) {
      throw new Error(
        `Template element with selector "${selector}" not found.`
      );
    }
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data);
      this._remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      const isCompleted = this._todoCheckboxEl.checked; 
      this._toggleCompletion();
      this._handleCheck(isCompleted);
    });
  }

  _toggleCompletion() {
    this._data.completed = !this._data.completed;
  }

  _generateDate() {
    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      } else {
        console.warn("Invalid date:", this._data.date);
      }
    } else {
      this._todoDate.textContent = "No due date set";
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoCheckboxEl.checked = Boolean(this._data.completed);
    this._todoCheckboxEl.id = `todo-${this._data.id || "unknown"}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id || "unknown"}`);
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  _remove() {
    this._todoElement.remove();
    this._todoElement = null;
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoElement.querySelector(".todo__name").textContent =
      this._data.name || "Untitled Task";

    this._generateCheckboxEl();
    this._generateDate();

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
