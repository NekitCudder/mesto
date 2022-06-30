const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1613993744586-bfe156f5b151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1516128951626-81bbba97c77f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1600421539016-cc3f0866d2b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1557094005-176cbfe3554d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
  },
  {
    name: 'Алтайский край',
    link: 'https://images.unsplash.com/photo-1634876371588-d38b1c44271c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Ломоносов',
    link: 'https://images.unsplash.com/photo-1573155993864-9c31895fafe8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}
const popup = document.querySelector('.popup');
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

const template = document.querySelector('#elements').content;
const editTemplate = document.querySelector('.cards');

const nameCardInput = document.querySelector('.popup__name-card');
const linkCardInput = document.querySelector('.popup__link-card');

const imagePopup = document.querySelector('.popup__image');
const subPopup = document.querySelector('.popup__sub');

//функция создания новой карточки
const newCard = (name, link) => {
  const templateCard = template.querySelector('.cards__item').cloneNode(true);
  const templateTitle = templateCard.querySelector('.cards__title');
  const templateImage = templateCard.querySelector('.cards__image');
  const templateDeleteCard = templateCard.querySelector('.cards__button-delete');
  const buttonLike = templateCard.querySelector('.cards__button-like');
  templateTitle.textContent = name;
  templateImage.src = link;
  templateImage.alt = name;

  //обработчик событий лайка карточки
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__button-like_active');
  });

  // обработчик событий открытия карточки
  templateImage.addEventListener('click', () => {
    imagePopup.src = link;
    subPopup.textContent = name;
    imagePopup.alt = name;
    popupOpen(popupOpenCard);
  });

  // обработчик событий удаления карточки
  templateDeleteCard.addEventListener('click', () => {
    DeleteCard(templateCard);
  });
  return templateCard;
}

//функция открытия попапа
const popupOpen = (open) => {
  document.addEventListener('keydown', closePopupByKey);
  document.addEventListener('click', closePopupByOverlay);
  open.classList.add('popup_opened');
}
//функция закрытия попапа
const popupClose = (close) => {
  document.removeEventListener('keydown', closePopupByKey);
  document.removeEventListener('click', closePopupByOverlay);
  close.classList.remove('popup_opened');

}
//функция закрытия попапа по нажатию на Esc
const closePopupByKey = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    popupClose(popup);
  }
}
//функция закрытия попапа по нажатию на оверлей
const closePopupByOverlay = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    popupClose(popup);
  }
}

//функция изменения данных профиля
const formSubmitProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  popupClose(popupEditProfile);
}
//функция добавления новой карточки
const formSubmitCard = (evt) => {
  evt.preventDefault();
  editTemplate.prepend(newCard(nameCardInput.value, linkCardInput.value));
  formPopupCard.reset();
  popupClose(popupAddCard);
}
//функция удаления карточки
const DeleteCard = (item) => {
  item.remove();
}

//функция добавления карточек при загрузке страницы
initialCards.forEach((item) => {
  editTemplate.append(newCard(item.name, item.link));
});

//обработчики событий открытия попапов
buttonEditProfile.addEventListener('click', () => {
  popupOpen(popupEditProfile);
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
});
buttonAddCard.addEventListener('click', () => {
  popupOpen(popupAddCard);
});

//обработчики событий закрытия попапов
buttonCloseProfile.addEventListener('click', () => {
  popupClose(popupEditProfile);
});
buttonCloseCard.addEventListener('click', () => {
  popupClose(popupAddCard);
});
buttonCloseImage.addEventListener('click', () => {
  popupClose(popupOpenCard);
});

//обработчик событий сохранения данных
formPopupProfile.addEventListener('submit', formSubmitProfile);
formPopupCard.addEventListener('submit', formSubmitCard);
