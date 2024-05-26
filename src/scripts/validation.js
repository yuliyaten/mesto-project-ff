// Функция, которая показывает класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {
  const isValid = inputElement.checkValidity();
  if (!isValid) {
    if (inputElement.validity.patternMismatch) {
      const customErrorMessage = inputElement.dataset.errorMessage;
      showInputError(formElement, inputElement, customErrorMessage, config);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция, которая делает кнопку неактивной
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

// Функция, которая делает кнопку неактивной
const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

// Функция, которая делает кнопку активной
const enableButton = (buttonElement, config) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
};

// Функция, которая проверяет input на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
 
// //Добавление обработчиков всем полям формы
const setEventListeners = (formElement, config) => {
 const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
 const buttonElement = formElement.querySelector(config.submitButtonSelector);

 toggleButtonState(inputList, buttonElement, config);

 inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', () => {
     checkInputValidity(formElement, inputElement, config);
     toggleButtonState(inputList, buttonElement, config);
   });
 });
};

// Функция для проверки всех форм на валидность
export const enableValidation = (config) => {
 const formList = Array.from(document.querySelectorAll(config.formSelector));
 formList.forEach((formElement) => {
   setEventListeners(formElement, config);
  }); 
}

// Функция, которая очищает ошибки валидации формы
export const clearValidation = (formElement, config) => {
 const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
 inputList.forEach((inputElement) => {
   hideInputError(formElement, inputElement, config);
 });
 const buttonElement = formElement.querySelector(config.submitButtonSelector);
 disableButton(buttonElement, config);
};