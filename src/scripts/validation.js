// Функция, которая добавляет класс с ошибкой
export const showInputError = (formElement, inputElement, validationConfig, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой

export const hideInputError = (formElement, inputElement, validationConfig) => {
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
 inputElement.classList.remove(validationConfig.inputErrorClass);
 errorElement.classList.remove(validationConfig.errorClass);
 errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля

export const checkInputValidity = (formElement, inputElement, validationConfig) => {
 if (!inputElement.validity.valid) {
   showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage);
 } else {
   hideInputError(formElement, inputElement, validationConfig);
 }
};

// //Добавление обработчиков всем полям формы

export const setEventListeners = (formElement, validationConfig) => {
 const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
 const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

 toggleButtonState(inputList, buttonElement, validationConfig);

 inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', () => {
     checkInputValidity(formElement, inputElement, validationConfig);
     toggleButtonState(inputList, buttonElement, validationConfig);
   });
 });
};

export const enableValidation = (validationConfig) => {
 const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
 formList.forEach((formElement) => {
 formElement.addEventListener('submit', (evt) => {
   evt.preventDefault();
 });
   setEventListeners(formElement, validationConfig);
}); 
}

// Функция, которая делает кнопку неактивной

export const toggleButtonState = (inputList, buttonElement, validationConfig) => {
 if (hasInvalidInput(inputList)) {
   buttonElement.disabled = true;
   buttonElement.classList.add(validationConfig.inactiveButtonClass);
 } else {
   buttonElement.disabled = false;
   buttonElement.classList.remove(validationConfig.inactiveButtonClass);
 }
}

export const hasInvalidInput = (inputList) => {
 return inputList.some((inputElement) => {
 return !inputElement.validity.valid;
 });
}

// Функция, которая очищает ошибки валидации формы

export const clearValidation = (formElement, validationConfig) => {
 const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
 inputList.forEach((inputElement) => {
   hideInputError(formElement, inputElement, validationConfig);
 });
 const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
 buttonElement.classList.add(validationConfig.inactiveButtonClass); 
};