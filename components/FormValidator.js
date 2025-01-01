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
    this._submitButton = this._formEl.querySelector(submitButtonSelector);
    this._inputList = Array.from(this._formEl.querySelectorAll(inputSelector));
  }

  _getErrorElement(inputElement) {
    return this._formEl.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    if (!errorElement) return;

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    if (!errorElement) return;

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._formEl.reset();
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}

export default FormValidator;
