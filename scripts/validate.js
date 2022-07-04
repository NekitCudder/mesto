// Функция, которая добавляет класс с ошибкой
const showInputError = (formPopup, inputPopup, errorMessage, config) => {
  const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.add(config.inputErrorClass);
  inputError.textContent = errorMessage;
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formPopup, inputPopup, config) => {
  const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.remove(config.inputErrorClass);
  inputError.textContent = '';
}
// Функция, которая проверяет валидность поля
const isValid = (formPopup, inputPopup) => {
  if (!inputPopup.validity.valid) {
    showInputError(formPopup, inputPopup, inputPopup.validationMessage, config);
  }
  else {
    hideInputError(formPopup, inputPopup, config);
  }
}
// Функция, которая проверяет валидность хотя бы одного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputPopup) => {
    return !inputPopup.validity.valid;
  });
}
// Функция, которая меняет состояние кнопки
const toggleButtonState = (inputList, buttonSubmit, config) => {
  if (hasInvalidInput(inputList)) {
    inactiveButton(buttonSubmit, config);
    buttonSubmit.disabled=true;
  } else {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
    buttonSubmit.disabled=false;
  }
}
// Функция, которая делает кнопку неактивной
const inactiveButton = (buttonSubmit, config) => {
  buttonSubmit.classList.add(config.inactiveButtonClass);
}

//Функция, которая добавляет слушателя всем полям input
const setEventListeners = (formPopup, config) => {
  const inputList = Array.from(formPopup.querySelectorAll(config.inputSelector));
  const buttonSubmit = formPopup.querySelector(config.submitButtonSelector);
  inputList.forEach((inputPopup) => {
    inputPopup.addEventListener('input', () => {
      isValid(formPopup, inputPopup);
      toggleButtonState(inputList, buttonSubmit, config);
    });
  });
}
//Функция, которая находит все попапы на странице
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formPopup) => {
    setEventListeners(formPopup, config);
  });
}

//Функция сброса формы
const resetForm = (formPopup, config) => {
  const inputs = formPopup.querySelectorAll(config.inputSelector);
  const submitButton = formPopup.querySelector(config.submitButtonSelector);
  inputs.forEach((inputPopup) => {
    hideInputError(formPopup, inputPopup, config);
  });
  inactiveButton(submitButton, config);
}