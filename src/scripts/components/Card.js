export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__button-like').addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });
    this._element.querySelector('.cards__button-delete').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });
    this._cardImage = this._element.querySelector('.cards__image');
    this._cardImage.addEventListener('click', () => {
      this._handleOpenCard();
    })
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('cards__button-like_active');
  }
  _handleDeleteCard(evt) {
    this._element.remove();
    this._element = null;
  }
  _handleOpenCard() {
    this._handleCardClick(this._name, this._link);
  }

}