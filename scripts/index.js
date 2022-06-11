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
const popupEP = document.querySelector('.popup_ep');
const popupAC = document.querySelector('.popup_ac');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const formPopupProfile = popupEP.querySelector('.popup__form');
const formPopupCard = popupAC.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_text_name');
const captionInput = document.querySelector('.popup__input_text_caption');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const buttonCloseProfile = popupEP.querySelector('.popup__button-close');
const buttonCloseCard = popupAC.querySelector('.popup__button-close');

const template = document.querySelector('#elements').content;
const editTemplate = document.querySelector('.cards')

const NameCardInput = document.querySelector('.popup__name-card');
const LinkCardInput = document.querySelector('.popup__link-card');


//функция создания новой карточки
const newCard = (name, link) => {
  const templateCards = template.querySelector('.cards__item').cloneNode(true);
  const templateTitle = templateCards.querySelector('.cards__title');
  const templateImage = templateCards.querySelector('.cards__image');
  templateTitle.textContent = name;
  templateImage.src = link;
  return templateCards;
}

//функция открытия попапа
const popupOpen = (open) => {
  open.classList.add('popup_opened');
}
//функция закрытия попапа
const popupClose = (close) => {
  close.classList.remove('popup_opened');
}
//функция изменения данных профиля
const formSubmitProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  popupClose(popupEP);
}
//функция добавления новой карточки
const formSubmitCard = (evt) => {
  evt.preventDefault();
  editTemplate.prepend(newCard(NameCardInput.value, LinkCardInput.value));
  popupClose(popupAC);
}


//обработчики событий открытия попапов
buttonEditProfile.addEventListener('click', () => {
  popupOpen(popupEP);
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
});
buttonAddCard.addEventListener('click', () => {
  popupOpen(popupAC);
});

//обработчики событий закрытия попапов
buttonCloseProfile.addEventListener('click', () => {
  popupClose(popupEP);
});
buttonCloseCard.addEventListener('click', () => {
  popupClose(popupAC);
});

//обработчик событий сохранения данных
formPopupProfile.addEventListener('submit', formSubmitProfile);
formPopupCard.addEventListener('submit', formSubmitCard);

//функция добавления карточек при загрузке страницы
initialCards.forEach((item) => {
  editTemplate.append(newCard(item.name, item.link));
})