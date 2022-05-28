let popup = document.querySelector('.popup');
let buttonOpen = document.querySelector('.profile__button-edit');
let buttonSave = document.querySelector('.popup__button-save');
let formPopup = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let captionInput = document.querySelector('.popup__caption');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let buttonClose = document.querySelector('.popup__button-close');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value=profileName.textContent;
  captionInput.value=profileCaption.textContent;
}
buttonOpen.addEventListener('click', popupOpen);

function popupClose() {
  popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', popupClose);

function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
}

formPopup.addEventListener('submit', formSubmit);
buttonSave.addEventListener('click', formSubmit);
buttonSave.addEventListener('click', popupClose);