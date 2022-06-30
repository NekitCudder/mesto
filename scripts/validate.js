  const formPopup = document.querySelector('.popup__form');
  const inputPopup = document.querySelector('.popup__input');

// Функция, которая добавляет класс с ошибкой
const showInputError = (formPopup, inputPopup, errorMessage) => {
  const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.add(config.inputErrorClass);
  inputError.classList.add(config.errorClass);
  inputError.textContent = errorMessage;
}
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formPopup, inputPopup) => {
  const inputError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.remove(config.inputErrorClass);
  inputError.classList.remove(config.errorClass);
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
    buttonSubmit.classList.add(config.inactiveButtonClass);
  } else {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
  }
}


const setEventListener = (formPopup) => {
  const inputList = Array.from(formPopup.querySelectorAll(config.inputSelector));
  const buttonSubmit = document.querySelector(config.submitButtonSelector);
  inputList.forEach((inputPopup) => {
    inputPopup.addEventListener('input', () => {
      isValid(formPopup, inputPopup);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formPopup) => {
    formPopup.addEventListener('sumbit', (evt) => {
      evt.preventDefault();
    });
  });
  setEventListener(formPopup);
}

enableValidation();
