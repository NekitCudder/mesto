const formPopup = document.querySelector('.popup__form');
const inputPopup = document.querySelector('.popup__input');

// Функция, которая добавляет класс с ошибкой
const showInputError = (formPopup, inputPopup, errorMessage) => {
  const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.add(config.inputErrorClass);
  inputError.textContent = errorMessage;
}
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formPopup, inputPopup) => {
  const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.remove(config.inputErrorClass);
  inputError.textContent = '';
}
// Функция, которая проверяет валидность поля
const isValid = (formPopup, inputPopup) => {
  if (!inputPopup.validity.valid) {
    showInputError(formPopup, inputPopup, inputPopup.validationMessage)
  }
  else {
    hideInputError(formPopup, inputPopup)
  }
}
// Функция, которая проверяет валидность хотя бы одного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputPopup) => {
    return !inputPopup.validity.valid;
  });
}
// Функция, которая меняет состояние кнопки
const toggleButtonState = (inputList, buttonSubmit) => {
  if (hasInvalidInput(inputList)) {
    inactiveButton(buttonSubmit);
  } else {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
  }
}

const inactiveButton = (buttonSubmit) => {
  buttonSubmit.classList.add(config.inactiveButtonClass);
}

//Функция, которая добавляет слушателя всем полям input
const setEventListeners = (formPopup) => {
  const inputList = Array.from(formPopup.querySelectorAll(config.inputSelector));
  const buttonSubmit = formPopup.querySelector(config.submitButtonSelector);
  inputList.forEach((inputPopup) => {
    inputPopup.addEventListener('input', () => {
      isValid(formPopup, inputPopup);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
}
//Функция, которая находит все попапы на странице
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formPopup) => {
    formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formPopup);
  });
}
enableValidation();

//Функция сброса формы
const resetForm = (formPopup) => {
  const inputs = formPopup.querySelectorAll(config.inputSelector);
  const submitButton = formPopup.querySelector(config.submitButtonSelector);
  inputs.forEach((inputPopup) => {
    inputPopup.classList.remove(config.inputErrorClass);
    const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputError.textContent = '';
  });
  inactiveButton(submitButton);
}