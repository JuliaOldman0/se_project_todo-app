class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);

    if (!this._templateElement) {
      throw new Error(`Template element with selector "${selector}" not found.`);
    }
  }

  _setEventListeners() {
    this._toggleCompletion = () => {
      this._data.completed = !this._data.completed;
    };

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoCheckboxEl.removeEventListener("change", this._toggleCompletion);
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", this._toggleCompletion);
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

  _generateDate() {
    if (this._data.date) {
      this._dueDate = new Date(this._data.date);
      if (!isNaN(this._dueDate)) {
        this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}`;
      } else {
        console.warn("Invalid date:", this._data.date);
      }
    } else {
      console.warn("No date provided in data.");
    }
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
