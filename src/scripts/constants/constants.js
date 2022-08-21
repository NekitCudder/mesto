// export const initialCards = [
//   {
//     name: 'Санкт-Петербург',
//     link: 'https://images.unsplash.com/photo-1613993744586-bfe156f5b151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
//   },
//   {
//     name: 'Сочи',
//     link: 'https://images.unsplash.com/photo-1516128951626-81bbba97c77f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//   },
//   {
//     name: 'Казань',
//     link: 'https://images.unsplash.com/photo-1600421539016-cc3f0866d2b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://images.unsplash.com/photo-1557094005-176cbfe3554d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
//   },
//   {
//     name: 'Алтайский край',
//     link: 'https://images.unsplash.com/photo-1634876371588-d38b1c44271c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
//   },
//   {
//     name: 'Ломоносов',
//     link: 'https://images.unsplash.com/photo-1573155993864-9c31895fafe8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
//   }
// ];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

export const popupEditProfile = '.popup_edit-profile';
export const popupAddCard = '.popup_add-card';
export const popupOpenCard = '.popup_open-card';
export const popupChangeAvatar = '.popup_change-avatar';
export const buttonEditProfile = document.querySelector('.profile__button-edit');
export const buttonAddCard = document.querySelector('.profile__button-add');
export const nameInput = document.querySelector('.popup__input_text_name');
export const captionInput = document.querySelector('.popup__input_text_caption');
export const editTemplate = document.querySelector('.cards');
export const popupProfile = document.querySelector('.popup-profile');
export const popupCard = document.querySelector('.popup-card');
export const cardsLikeCounter = document.querySelector('.cards__like-counter');

export const popupDeleteCard = '.popup_delete-card';
export const popupAvatar = document.querySelector('.popup-avatar');
export const buttonChangeAvatar = document.querySelector('.profile__avatar-edit');