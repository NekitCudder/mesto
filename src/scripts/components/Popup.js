export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose=this._handleEscClose.bind(this);
    this._closePopupByOverlay=this._closePopupByOverlay.bind(this);
  }
  //функция открытия попапа
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._closePopupByOverlay);
    this._popup.classList.add('popup_opened');
  }
  //функция закрытия попапа
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._closePopupByOverlay);
    this._popup.classList.remove('popup_opened');
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
  //обработчик событий закрытия попапов
  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener("click", () => {
      this.close();
    });

    // closeButtons.forEach((button) => {
    //   const popup = button.closest('.popup');
    //   button.addEventListener('click', () => this.close());
    // });
  }
}