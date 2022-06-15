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

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup')
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
  })

  // обработчик событий открытия карточки
  templateImage.addEventListener('click', () => {
    imagePopup.src = link;
    subPopup.textContent = name;
    imagePopup.alt = name;
    openPopup(popupOpenCard);
  })

  // обработчик событий удаления карточки
  templateDeleteCard.addEventListener('click', () => {
    deleteCard(templateCard);
  })

  return templateCard;
}

//функция открытия попапа
const openPopup = (open) => {
  open.classList.add('popup_opened');
}
//функция закрытия попапа
const closePopup = (close) => {
  close.classList.remove('popup_opened');
}
//функция изменения данных профиля
const handleProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  closePopup(popupEditProfile);
}
//функция добавления новой карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault();
  editTemplate.prepend(newCard(nameCardInput.value, linkCardInput.value));
  formPopupCard.reset();
  closePopup(popupAddCard);
}
//функция удаления карточки
const deleteCard = (item) => {
  item.remove();
}

//функция добавления карточек при загрузке страницы
initialCards.forEach((item) => {
  editTemplate.append(newCard(item.name, item.link));
})

//обработчики событий открытия попапов
buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
});
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//обработчик событий закрытия попапа
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup)
    }
  })
})

//обработчик событий сохранения данных
formPopupProfile.addEventListener('submit', handleProfileSubmit);
formPopupCard.addEventListener('submit', handleCardSubmit);



