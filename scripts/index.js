let popup = document.querySelector('.popup');
let buttonOpen = document.querySelector('.profile__button-edit');
let formPopup = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_text_name');
let captionInput = document.querySelector('.popup__input_text_caption');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let buttonClose = document.querySelector('.popup__button-close');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  popupClose();
}

buttonOpen.addEventListener('click', popupOpen);
buttonClose.addEventListener('click', popupClose);
formPopup.addEventListener('submit', formSubmit);