import { Card } from "./сard.js";
import { initialCards } from "./constants.js";
import { FormValidator } from "./formValidator.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupOpenCard = document.querySelector('.popup_open-card');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const formPopupProfile = popupEditProfile.querySelector('.popup__form');
const formPopupCard = popupAddCard.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_text_name');
const captionInput = document.querySelector('.popup__input_text_caption');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const editTemplate = document.querySelector('.cards');

const nameCardInput = document.querySelector('.popup__name-card');
const linkCardInput = document.querySelector('.popup__link-card');

const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');

const formProfileValidation = new FormValidator(config, popupProfile);
const formCardValidation = new FormValidator(config, popupCard);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();

//функция открытия карточки
const handleCardClick = (name, link) => {
  const popupOpenCard = document.querySelector('.popup_open-card');
  const imagePopup = document.querySelector('.popup__image')
  const subPopup = document.querySelector('.popup__sub');
  imagePopup.src = link;
  subPopup.textContent = name;
  imagePopup.alt = name;
  openPopup(popupOpenCard);
}
//функция создания новой карточки
const createCard = (item) => {
  const card = new Card(item.name, item.link, '#elements', handleCardClick);
  const cardEl = card.generateCard();
  return cardEl;
}
//добавление карточек из initialCards
initialCards.forEach((item) => {
  editTemplate.append(createCard(item));
});

//функция добавления новой карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const newCardValues = {
    name: nameCardInput.value,
    link: linkCardInput.value
  }
  editTemplate.prepend(createCard(newCardValues));
  closePopup(popupAddCard);
}


//функция изменения данных профиля
const handleProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  closePopup(popupEditProfile);
}
//обработчики событий открытия попапов
buttonEditProfile.addEventListener('click', () => {
  formProfileValidation.resetForm();
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
});
buttonAddCard.addEventListener('click', () => {
  formCardValidation.resetForm();
  openPopup(popupAddCard);
});



//обработчик событий сохранения данных
formPopupProfile.addEventListener('submit', handleProfileSubmit);
formPopupCard.addEventListener('submit', handleCardSubmit);

export { openPopup };