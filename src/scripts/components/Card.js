export class Card {
  constructor({ data, cardSelector, handleDeleteConfirm, handleCardClick, handlePutCardLike, handleDeleteCardLike, userId }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._handleCardClick = handleCardClick;
    this._handlePutCardLike = handlePutCardLike;
    this._handleDeleteCardLike = handleDeleteCardLike;
    this._userOwner = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
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
    this.handleLikeCounter(this._likes.length);

    if (!(this._userOwner === this._userId)) {
      this._cardButtonDelete.style.display = 'none';
    }

    return this._element;
  }

  _setEventListeners() {
    this._cardButtonLike = this._element.querySelector('.cards__button-like');
    this._cardButtonLike.addEventListener('click', (evt) => {
      this._handleLikeCard();
    });
    this._cardButtonDelete = this._element.querySelector('.cards__button-delete');
    this._cardButtonDelete.addEventListener('click', (evt) => {
      this._handleDeleteConfirm();
    });
    this._cardImage = this._element.querySelector('.cards__image');
    this._cardImage.addEventListener('click', () => {
      this._handleOpenCard();
    })
  }
  handleLikeCounter(data) {
    this._cardsLikeCounter = this._element.querySelector('.cards__like-counter');
    this._cardsLikeCounter.textContent = data;
  }

  changleLike() {
    this._cardButtonLike.classList.toggle('cards__button-like_active');
  }

  _handleLikeCard() {
    if (this._cardButtonLike.classList.contains('cards__button-like_active')) {
      this._handleDeleteCardLike();
    }
    else {
      this._handlePutCardLike();
    }
  }

  _handleOpenCard() {
    this._handleCardClick(this._name, this._link);
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

}