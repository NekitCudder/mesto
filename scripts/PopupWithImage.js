import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
  open(data) {
    super.open;

    this._imagePopup = this._popupSelector.querySelector('.popup__image');
    this._subPopup = this._popupSelector.querySelector('.popup__sub');

    this._imagePopup.src = data.link;
    this._imagePopup.alt = data.link;
    this._subPopup.textContent = data.name;

  }
}