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

// const forms = Array.from(document.querySelectorAll('.popup__form'));
// forms.forEach((formsElement) => {
//   const formValid = new FormValidator(config, formsElement);
//   formValid.enableValidation();
// });

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
const buttonCloseProfile = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseCard = popupAddCard.querySelector('.popup__button-close');
const buttonCloseImage = popupOpenCard.querySelector('.popup__button-close');
const buttonSubmitProfile = popupEditProfile.querySelector('.popup__button-save');
const editTemplate = document.querySelector('.cards');

const nameCardInput = document.querySelector('.popup__name-card');
const linkCardInput = document.querySelector('.popup__link-card');

const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');

const formProfileValidation = new FormValidator(config, popupProfile);
const formCardValidation = new FormValidator(config, popupCard);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#elements');
  editTemplate.append(card.generateCard());
});

//функция добавления новой карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const card = new Card(nameCardInput.value, linkCardInput.value, '#elements');
  editTemplate.prepend(card.generateCard());
  // formPopupCard.reset();
  closePopup(popupAddCard);
}

//функция открытия попапа
const openPopup = (open) => {
  document.addEventListener('keydown', closePopupByKey);
  document.addEventListener('click', closePopupByOverlay);
  open.classList.add('popup_opened');
}
//функция закрытия попапа
const closePopup = (close) => {
  document.removeEventListener('keydown', closePopupByKey);
  document.removeEventListener('click', closePopupByOverlay);
  close.classList.remove('popup_opened');

}
//функция закрытия попапа по нажатию на Esc
const closePopupByKey = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}
//функция закрытия попапа по нажатию на оверлей
const closePopupByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
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
  buttonSubmitProfile.classList.remove('popup__button-save_inactive');
  buttonSubmitProfile.removeAttribute('disabled');
});
buttonAddCard.addEventListener('click', () => {
  formCardValidation.resetForm();
  openPopup(popupAddCard);
  // formPopupCard.reset();
});

//обработчики событий закрытия попапов
buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
buttonCloseCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});
buttonCloseImage.addEventListener('click', () => {
  closePopup(popupOpenCard);
});

//обработчик событий сохранения данных
formPopupProfile.addEventListener('submit', handleProfileSubmit);
formPopupCard.addEventListener('submit', handleCardSubmit);

export { openPopup };
