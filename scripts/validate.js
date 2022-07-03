// Функция, которая добавляет класс с ошибкой
const showInputError = (formPopup, inputPopup, errorMessage, inputErrorClass, config) => {
    console.log(formPopup);
    console.log(inputPopup);
    console.log(errorMessage);
    console.log(inputErrorClass);

  const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
    console.log(inputError);
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
const isValid = (formPopup, inputPopup, config) => {
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
    inactiveButton(buttonSubmit);
  } else {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
  }
}

const inactiveButton = (buttonSubmit, config) => {
  buttonSubmit.classList.add(config.inactiveButtonClass);
}

//Функция, которая добавляет слушателя всем полям input
const setEventListeners = (formPopup, config) => {
  const inputList = Array.from(formPopup.querySelectorAll(config.inputSelector));
  const buttonSubmit = formPopup.querySelector(config.submitButtonSelector);
  inputList.forEach((inputPopup) => {
    inputPopup.addEventListener('input', () => {
      isValid(formPopup, inputPopup, config);
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