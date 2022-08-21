import Popup from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setAction(action) {
    this._submitForm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__button-remove').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}