import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = document.querySelector('.popup__image');
    this._subPopup = this._popup.querySelector('.popup__sub');
  }
  open(name, link) {
    super.open();

    this._imagePopup.src = link;
    this._imagePopup.alt = name;
    this._subPopup.textContent = name;
  }
}