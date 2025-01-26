class Popup {
  constructor({ popupSelect }) {
    this._popupElement = document.querySelector(popupSelect);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      // TODO - call the close method
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    console.log("close method called");
    // TODO - remove the escape listener
  }

  setEventListeners() {
    // this._popupCloseBtn.addEventListener("click", () => {
    //   this.close();
    // });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.popup__close || evt.target.popup) this.close();

      // TODO/ check on top - if the event target's classList contains "popup__close" or "popup"
      // then close the modal
    });
  }
}

export default Popup;
