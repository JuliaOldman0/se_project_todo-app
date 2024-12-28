class FormValidator {
  constructor(settings = {}, formEl) {
    const {
      inputSelector = ".form__input",
      submitButtonSelector = ".form__submit",
      errorClass = "form__input-error_active",
      inputErrorClass = "form__input_type_error",
      inactiveButtonClass = "form__submit_inactive",
    } = settings;

    if (!formEl) {
      throw new Error("Form element is required.");
    }

    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._errorClass = errorClass;
    this._inputErrorClass = inputErrorClass;
    this._inactiveButtonClass = inactiveButtonClass;
    this._formEl = formEl;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) {
      console.error(`Error element not found for input with ID: ${inputElement.id}`);
      return;
    }
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
    // if (!errorElement) {
    //   console.error(`Error element not found for input with ID: ${inputElement.id}`);
    //   return;
    // }
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    // if (!inputElement.id) {
    //   console.warn("Input element does not have an ID. Validation skipped.");
    //   return;
    // }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (!inputList || !buttonElement) {
      console.warn("Input list or button element is missing.");
      return;
    }

    const hasInvalidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    if (!this._inputList.length) {
      console.warn("No inputs found in the form.");
    }

    if (!buttonElement) {
      console.warn("Submit button not found in the form.");
    }

    this._toggleButtonState(this._inputList, buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
