import './index.css';
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithConfirm } from '../scripts/components/PopupWithConfirm';
import { Api } from "../scripts/components/Api.js";
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
  popupProfile,
  popupCard,
  popupDeleteCard,
  popupAvatar,
  buttonChangeAvatar,
  popupChangeAvatar,
} from "../scripts/constants/constants.js"

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '3629ec08-4cd1-4c9c-b53e-0de7dbdbb7c9',
    'Content-Type': 'application/json'
  }
});

//создание информации о профиле
const newProfile = new UserInfo({
  name: '.profile__name',
  info: '.profile__caption',
  avatar: '.profile__avatar',
});
//получение данных пользователя с сервера
api.getUserInfo() //!!!на будущее:объединить в промис вместе с вызовом getUserInfo!!!
  .then((res) => {
    newProfile.setUserInfo(res);
    newProfile.setUserAvatar(res);
    userId = res._id;
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных пользователя с сервера: ${err}`);
  });

//валидация форм
const formProfileValidation = new FormValidator(config, popupProfile);
const formCardValidation = new FormValidator(config, popupCard);
const formAvatarValidation = new FormValidator(config, popupAvatar);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();
formAvatarValidation.enableValidation();

//создание попапа с изображением
const newImagePopup = new PopupWithImage(popupOpenCard);
newImagePopup.setEventListeners();

//функция создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,

    cardSelector: '#elements',

    handleDeleteConfirm: () => {

      newDeleteCardPopup.setAction(() => {
        api.deleteCard(data._id)
          .then(() => {
            card.handleDeleteCard();
            newDeleteCardPopup.close();
          })
          .catch((err) => {
            console.log(`Ошибка удаления карточки пользователя: ${err}`);
          });
      })
      newDeleteCardPopup.open();
    },

    handleCardClick: () => {
      newImagePopup.open(data)
    },

    handlePutCardLike: () => {
      api.likePut(data._id)
        .then((res) => {
          card.changleLike();
          card.handleLikeCounter(res.likes.length);
        })
    },

    handleDeleteCardLike: () => {
      api.likeDelete(data._id)
        .then((res) => {
          card.changleLike();
          card.handleLikeCounter(res.likes.length);
        })
    },

    userId: userId
  });
  return card;
}

//добавление карточек с сервера
const initialCardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      const cardEl = card.generateCard();
      initialCardList.addItem(cardEl);
    },
  },
  editTemplate);

api.getInitialCards()
  .then((res) => {
    console.log('карточки с сервера');
    console.log(res);
    initialCardList.renderItems(res);
  })
  .catch((err) => {
    console.log(`Ошибка добавления карточек с сервера: ${err}`);
  });

//функция редактирования данных профиля
const submitProfile = (items) => {
  newProfilePopup.setMessageOfLoading(true);
  api.editUserInfo(items)
    .then((res) => {
      newProfile.setUserInfo(res);
      newProfile.setUserAvatar(res);
      newProfilePopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка редактирования данных пользователя: ${err}`);
    })
    .finally(() => {
      newProfilePopup.setMessageOfLoading(false);
    })
}
//функция изменения аватара
const submitAvatar = (items) => {
  newAvatarPopup.setMessageOfLoading(true);
  api.editAvatar(items)
    .then((res) => {
      newProfile.setUserAvatar(res);
      newAvatarPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка загрузки нового аватара: ${err}`);
    })
    .finally(() => {
      newAvatarPopup.setMessageOfLoading(false);
    })
}
//функция добавления новой карточки
const submitCard = (data) => {
  newCardPopup.setMessageOfLoading(true);
  api.addNewCard(data)
    .then((res) => {
      const newCard = createCard(res);
      const cardEl = newCard.generateCard();
      initialCardList.addNewItem(cardEl);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка добавления новой карточки: ${err}`);
    })
    .finally(() => {
      newCardPopup.setMessageOfLoading(false);
    })
}

//создание попапа добавления карточки
const newCardPopup = new PopupWithForm(popupAddCard, submitCard);
newCardPopup.setEventListeners();
//создание попапа редактирования профиля
const newProfilePopup = new PopupWithForm(popupEditProfile, submitProfile);
newProfilePopup.setEventListeners();
//создание попапа удаления карточки
const newDeleteCardPopup = new PopupWithConfirm(popupDeleteCard);
newDeleteCardPopup.setEventListeners();
//создание попапа изменения аватара
const newAvatarPopup = new PopupWithForm(popupChangeAvatar, submitAvatar);
newAvatarPopup.setEventListeners();

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
buttonChangeAvatar.addEventListener('click', () => {
  formAvatarValidation.resetForm();
  newAvatarPopup.open();
});
