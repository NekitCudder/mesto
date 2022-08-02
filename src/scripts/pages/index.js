import '../../pages/index.css';
import { Card } from "../components/сard.js";
import { FormValidator } from "../components/formValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards } from "../constants/constants.js";
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
  popupCard
} from "../constants/constants.js"

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

//функция открытия попапа с изображением
const handleCardClick = (name, link) => {
  //создание попапа с изображением
  const newImagePopup = new PopupWithImage(popupOpenCard);
  newImagePopup.open(name, link);
  newImagePopup.setEventListeners();
}
//функция создания новой карточки
const createCard = (item) => {
  const card = new Card(item.name, item.link, '#elements', handleCardClick);
  const cardEl = card.generateCard();
  initialCardList.addItem(cardEl);
  return cardEl;
}
//добавление карточек из initialCards
const initialCardList = new Section(
  initialCards,
  (data) => {
    const card = createCard(data);
    initialCardList.addItem(card);
  },
  editTemplate);
initialCardList.renderItems();

//функция редактирования данных профиля
const submitProfile = (data) => {
  newProfile.setUserInfo(data.name, data.info);
}
//функция добавления новой карточки
const submitCard = () => {
  const newCardValues = {
    name: nameCardInput.value,
    link: linkCardInput.value
  }
  const newCard = createCard(newCardValues);
  initialCardList.addItem(newCard);
}

//создание попапа добавления карточки
const newCardPopup = new PopupWithForm(popupAddCard, submitCard);
newCardPopup.setEventListeners();
//создание попапа редактирования профиля
const newProfilePopup = new PopupWithForm(popupEditProfile, submitProfile);
newProfilePopup.setEventListeners();

//обработчики событий открытия попапов
buttonEditProfile.addEventListener('click', () => {
  formProfileValidation.resetForm();
  newProfilePopup.open();
  nameInput.value = newProfile.getUserInfo().name;
  captionInput.value = newProfile.getUserInfo().info;
});
buttonAddCard.addEventListener('click', () => {
  formCardValidation.resetForm();
  newCardPopup.open();
});
