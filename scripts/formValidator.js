class FormValidator {
  constructor(data, elementValidate) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._elementValidate = elementValidate;

    this._inputList = Array.from(this._elementValidate.querySelectorAll(this._inputSelector));
    this._inputs = this._elementValidate.querySelectorAll(this._inputSelector);
    this._buttonSubmit = this._elementValidate.querySelector(this._submitButtonSelector);
    this._submitButton = this._elementValidate.querySelector(this._submitButtonSelector);
  }
  // Функция, которая добавляет класс с ошибкой
  _showInputError(inputPopup, errorMessage) {
    const inputError = this._elementValidate.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
  }
  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputPopup) {
    const inputError = this._elementValidate.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
  }
  // Функция, которая проверяет валидность поля
  _isValid(inputPopup) {
    if (!inputPopup.validity.valid) {
      this._showInputError(inputPopup, inputPopup.validationMessage);
    }
    else {
      this._hideInputError(inputPopup);
    }
  }

  // Функция, которая проверяет валидность хотя бы одного поля
  _hasInvalidInput(inputList) {
    return inputList.some((inputPopup) => {
      return !inputPopup.validity.valid;
    });
  }
  // Функция, которая меняет состояние кнопки
  _toggleButtonState(inputList, buttonSubmit) {
    if (this._hasInvalidInput(inputList)) {
      this._inactiveButton(buttonSubmit);
    } else {
      buttonSubmit.classList.remove(this._inactiveButtonClass);
      buttonSubmit.disabled = false;
    }
  }
  // Функция, которая делает кнопку неактивной
  _inactiveButton(buttonSubmit) {
    buttonSubmit.classList.add(this._inactiveButtonClass);
    buttonSubmit.disabled = true;
  }

  //Функция, которая добавляет слушателя всем полям input
  _setEventListeners() {
    this._inputList.forEach((inputPopup) => {
      inputPopup.addEventListener('input', () => {
        this._isValid(inputPopup);
        this._toggleButtonState(this._inputList, this._buttonSubmit);
      });
    });
  }
  //Функция, которая находит все попапы на странице
  enableValidation() {
    this._setEventListeners();
  }

  // //Функция сброса формы
  resetForm() {
    this._elementValidate.reset();
    this._inputs.forEach((inputPopup) => {
      this._hideInputError(inputPopup);
    });
    this._inactiveButton(this._submitButton);
  }
}

export { FormValidator };
