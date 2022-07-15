import { openPopup } from './index.js';

class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.cards__title').textContent = this._name;
    this._element.querySelector('.cards__image').src = this._link;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__button-like').addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });
    this._element.querySelector('.cards__button-delete').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleOpenCard();
    });
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('cards__button-like_active');
  }
  _handleDeleteCard(evt) {
    evt.target.closest('.cards__item').remove();
  }
  _handleOpenCard() {
    const popupOpenCard = document.querySelector('.popup_open-card');
    const imagePopup = document.querySelector('.popup__image');
    const subPopup = document.querySelector('.popup__sub');
    imagePopup.src = this._link;
    subPopup.textContent = this._name;
    imagePopup.alt = this._name;
    openPopup(popupOpenCard);
  }
}

export { Card };