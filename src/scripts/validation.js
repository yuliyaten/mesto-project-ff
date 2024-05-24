// Функция, которая добавляет класс с ошибкой
import { validationConfig } from './index.js';

// Функция, которая показывает класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
 if (!inputElement.validity.valid) {
   showInputError(formElement, inputElement, inputElement.validationMessage);
 } else {
   hideInputError(formElement, inputElement);
 }
};

// Функция, которая делает кнопку неактивной
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}

// Функция, которая делает кнопку неактивной
const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

// Функция, которая делает кнопку активной
const enableButton = (buttonElement) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
};

// Функция, которая проверяет input на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
 
// //Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
 const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
 const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

 toggleButtonState(inputList, buttonElement);

 inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', () => {
     checkInputValidity(formElement, inputElement);
     toggleButtonState(inputList, buttonElement);
   });
 });
};

// Функция для проверки всех форм на валидность
export const enableValidation = (validationConfig) => {
 const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
 formList.forEach((formElement) => {
   setEventListeners(formElement);
  }); 
}

// Функция, которая очищает ошибки валидации формы
export const clearValidation = (formElement) => {
 const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
 inputList.forEach((inputElement) => {
   hideInputError(formElement, inputElement);
 });
 const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
 disableButton(buttonElement);
};