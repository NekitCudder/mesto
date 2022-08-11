import './index.css';
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { initialCards } from "../scripts/constants/constants.js";
import {
  config,
  popupEditProfile,
  popupAddCard,
  popupOpenCard,
  buttonEditProfile,
  buttonAddCard,
  nameInput,
  captionInput,
  editTemplate,
  nameCardInput,
  linkCardInput,
  popupProfile,
  popupCard,
  popupDeleteCard,
  popupAvatar,
  linkAvatarInput,
  buttonChangeAvatar
} from "../scripts/constants/constants.js"
import { data } from 'autoprefixer';

//создание информации о профиле
const newProfile = new UserInfo({
  name: '.profile__name',
  info: '.profile__caption',
});

//валидация форм
const formProfileValidation = new FormValidator(config, popupProfile);
const formCardValidation = new FormValidator(config, popupCard);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();

//создание попапа с изображением
const newImagePopup = new PopupWithImage(popupOpenCard);
newImagePopup.setEventListeners();


//функция открытия попапа с изображением  
const handleCardClick = (name, link) => {
  newImagePopup.open(name, link);
}

//функция создания новой карточки
const createCard = (name, link) => {
  const card = new Card(name, link, '#elements', handleCardClick);
  const cardEl = card.generateCard();
  return cardEl;
}

//добавление карточек из initialCards
const initialCardList = new Section(
  initialCards,
  (data) => {
    const card = createCard(data.name, data.link);
    initialCardList.addItem(card);
  },
  editTemplate);
initialCardList.renderItems();

//функция редактирования данных профиля
const submitProfile = (data) => {
  newProfile.setUserInfo(data.name, data.info);
}
//функция добавления новой карточки
const submitCard = (data) => {
  const newCard = createCard(data.name, data.link);
  initialCardList.addItem(newCard);
}

// //функция удаления карточки
// const deleteCard = () => {

// }

//функция изменения аватара
// const submitAvatar = (data) =>{
//   const newAvatar 
// }

//создание попапа добавления карточки
const newCardPopup = new PopupWithForm(popupAddCard, submitCard);
newCardPopup.setEventListeners();
//создание попапа редактирования профиля
const newProfilePopup = new PopupWithForm(popupEditProfile, submitProfile);
newProfilePopup.setEventListeners();

// //создание попапа удаления карточки
// const newDeleteCardPopup = new PopupWithForm(popupDeleteCard, deleteCard);

//создание попапа изменения аватара
// const newAvatarPopup = new PopupWithForm(popupAvatar,submitAvatar)

//обработчики событий открытия попапов
buttonEditProfile.addEventListener('click', () => {
  const userInput = newProfile.getUserInfo();
  nameInput.value = userInput.name;
  captionInput.value = userInput.info;
  formProfileValidation.resetForm();
  newProfilePopup.open();
});
buttonAddCard.addEventListener('click', () => {
  formCardValidation.resetForm();
  newCardPopup.open();
});
// buttonChangeAvatar.addEventListener('click',() =>{
//   formCardValidation.resetForm();

// });
