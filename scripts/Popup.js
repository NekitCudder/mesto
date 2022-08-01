export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  //функция открытия попапа
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._closePopupByOverlay);
    this._popupSelector.classList.add('popup_opened');
  }
  //функция закрытия попапа
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._closePopupByOverlay);
    this._popupSelector.classList.remove('popup_opened');

  }
  //функция закрытия попапа по нажатию на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  //функция закрытия попапа по нажатию на оверлей
  _closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    //обработчик событий закрытия попапов
    const closeButtons = this._popupSelector.querySelector('.popup__button-close');
    closeButtons.forEach((button) => {
      const popup = button.closest('.popup');
      button.addEventListener('click', () => this.close());
    });
  }
}