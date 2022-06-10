const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popup = document.querySelector('.popup');
const popupEP = document.querySelector('.popup_ep');
const popupAC = document.querySelector('.popup_ac');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const formPopupProfile = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_text_name');
const captionInput = document.querySelector('.popup__input_text_caption');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const buttonCloseProfile = popupEP.querySelector('.popup__button-close');
const buttonCloseCard = popupAC.querySelector('.popup__button-close');


//функция открытия попапа
const popupOpen = (open) => {
  open.classList.add('popup_opened');
}
//функция закрытия попапа
const popupClose = (close) => {
  close.classList.remove('popup_opened');
}
//функция изменения данных профиля
const formSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  popupClose(popupEP);
}





//обработчик событий открытия попапов
buttonEditProfile.addEventListener('click', () => {
  popupOpen(popupEP);
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
});
buttonAddCard.addEventListener('click', () => {
  popupOpen(popupAC);
});

//обработчик событий закрытия попапов
buttonCloseProfile.addEventListener('click', () => {
  popupClose(popupEP);
});
buttonCloseCard.addEventListener('click', () => {
  popupClose(popupAC);
});

//обработчик событий сохранения данных
formPopupProfile.addEventListener('submit', formSubmit);