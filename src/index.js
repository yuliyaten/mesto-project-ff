import './pages/index.css';
import { closePopup, openPopup } from './scripts/modal.js';
import { createCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getProfileData, getCards, editProfileData, addNewCard, changeAvatar } from './scripts/api.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
let userId;

// Загрузка информации о пользователе с сервера и Загрузка карточек с сервера
Promise.all([getProfileData(), getCards()])
.then(([profileData, cards]) => {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.style.backgroundImage = `url(${profileData.avatar})`;
  userId = profileData._id;
  console.log({profileData, cards})
  
  cards.forEach((card) => {
    placesList.append(createCard(card, openImageCard, userId));
  });
})
.catch((error) => {
  console.error(error);
});


// Функция для открытия попапа с картинкой
function openImageCard(imageUrl, imageAlt) {
  popupImageElement.src = imageUrl;
  popupImageElement.alt = imageAlt;
  popupCaptionElement.textContent = imageAlt;
  openPopup(popupImage);
}

// Открытие модального окна для редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const allPopups = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');

// Слушатель на открытие профиля
editProfileButton.addEventListener('click', () => {
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});

// Слушатель на открытие новой карточки
addButton.addEventListener('click', () => {
  clearValidation(newPopupForm, validationConfig);
  openPopup(newCardPopup);
})

// Перебор массива всех попапов по оверлею
allPopups.forEach(popup => {
 popup.addEventListener('click', (event) => {
   if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
    closePopup(popup);
   }
 });
});

// Функция для управления состоянием кнопок
const setButtonLoadingState = (buttonElement, isLoading, loadingText = 'Сохранение...') => {
  if (isLoading) {
    buttonElement.dataset.originalText = buttonElement.textContent;
    buttonElement.textContent = loadingText;
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = buttonElement.dataset.originalText;
    buttonElement.disabled = false;
  }
};

// Редактирование имени и информации о себе
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_description');
const submitButtonProfile = editProfilePopup.querySelector('.popup__button');
const editProfileForm = editProfilePopup.querySelector('.popup__form');

function editProfile(evt) {
  evt.preventDefault(); 
  const name = nameInput.value;
  const job = jobInput.value;

  setButtonLoadingState(submitButtonProfile, true);

  editProfileData(name, job)
  .then(updatedProfileData => {
    profileTitle.textContent = updatedProfileData.name;
    profileDescription.textContent = updatedProfileData.about;
    closePopup(editProfilePopup);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    setButtonLoadingState(submitButtonProfile, false);
  });
}

editProfileForm.addEventListener('submit', editProfile);

// Добавление карточки
const newCardName = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardLink = newCardPopup.querySelector('.popup__input_type_url');
const newPopupForm = newCardPopup.querySelector('.popup__form');
const submitButtonNewPopup = newCardPopup.querySelector('.popup__button');

// Функция добавления новой карточки
function newCardSubmit(evt) {
  evt.preventDefault(); 
  const cardName = newCardName.value;
  const imageUrl = newCardLink.value;
  
  setButtonLoadingState(submitButtonNewPopup, true);

  addNewCard(cardName, imageUrl)
  .then((card) => {
    console.log(card);
    const newCardElement = createCard(card, openImageCard, userId);
    placesList.prepend(newCardElement);
    newPopupForm.reset();
    closePopup(newCardPopup);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    setButtonLoadingState(submitButtonNewPopup, false);
  });
};

newPopupForm.addEventListener('submit', newCardSubmit);

// Конфиг валидации (объект настроек)
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// Изменение аватара
const avatarButton = document.querySelector('.profile__avatar-button');
const avatarForm = document.querySelector('.popup_type_avatar');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');
const submitButtonAvatar = avatarForm.querySelector('.popup__button');

avatarButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
})

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const avatar = avatarInput.value;
  setButtonLoadingState(submitButtonAvatar, true);

  changeAvatar(avatar)
  .then((res) => {
    profileImage.style.backgroundImage = `url(${res.avatar})`;
    closePopup(avatarForm);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    setButtonLoadingState(submitButtonAvatar, false);
  });
});