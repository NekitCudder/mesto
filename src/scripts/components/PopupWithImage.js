import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._subPopup = this._popup.querySelector('.popup__sub');
  }
  open(data) {
    super.open();

    this._imagePopup.src = data.link;
    this._imagePopup.alt = data.name;
    this._subPopup.textContent = data.name;
  }
}