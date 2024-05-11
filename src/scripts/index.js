import { initialCards } from './cards.js';
import { closePopup, openPopup, closePopupByOverlay} from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, toggleButtonState, hasInvalidInput, clearValidation } from './validation.js';
import { getProfileData, getCards, editProfileData, addNewCard, changeAvatar } from './api.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// Функция для открытия попапа с картинкой
function openImageCard(imageUrl, imageAlt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');
  
  popupImageElement.src = imageUrl;
  popupImageElement.alt = imageAlt;
  popupCaptionElement.textContent = imageAlt;
  
  openPopup(popupImage);
}

function addCard(card) {
 const cardElement = createCard(card, deleteCard, likeCard, openImageCard);
 placesList.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  addCard(card);
});

// открытие модального окна для редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const allPopups = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');

// слушатель на открытие профиля
editProfileButton.addEventListener('click', () => {
 openPopup(editProfilePopup);
 nameInput.value = profileTitle.textContent;
 jobInput.value = profileDescription.textContent;
 clearValidation(editProfilePopup.querySelector(validationConfig.formSelector), validationConfig);
})

// слушатель на открытие новой карточки
addButton.addEventListener('click', () => {
 openPopup(newCardPopup);
 clearValidation(newCardPopup.querySelector(validationConfig.formSelector), validationConfig);
})

// перебор массива всех попапов по оверлею
allPopups.forEach(popup => {
 popup.addEventListener('click', (event) => {
   if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
    closePopupByOverlay(event.currentTarget);
   }
 });
});

// Редактирование имени и информации о себе
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function editProfile(evt) {
  evt.preventDefault(); 
  const name = nameInput.value;
  const job = jobInput.value;
  
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  
  closePopup(editProfilePopup);

  editProfileData(name, job)
  .then(updatedProfileData => {
    profileTitle.textContent = updatedProfileData.name;
    profileDescription.textContent = updatedProfileData.about;
  })
  .catch((error) => {
    console.error(error);
  });
}

editProfilePopup.addEventListener('submit', editProfile);

// Добавление карточки
const newCardName = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardLink = newCardPopup.querySelector('.popup__input_type_url');
const popupForm = newCardPopup.querySelector('.popup__form');

// Функция добавления новой карточки
function newCardSubmit(evt) {
  evt.preventDefault(); 
  const cardName = newCardName.value;
  const imageUrl = newCardLink.value;

  const card = {
    name: cardName,
    link: imageUrl
  }
  
  addNewCard(cardName, imageUrl)
  .then((data) => {
    card.name = data.name;
    card.link = data.link;
    card.likes = data.likes.length;
    card.owner = data.owner._id;

    console.log(data);
    const newCardElement = createCard(card, deleteCard, likeCard, openImageCard, card.owner);
    placesList.prepend(newCardElement);
    popupForm.reset();
    closePopup(newCardPopup);
  });
};

popupForm.addEventListener('submit', newCardSubmit);

// Конфиг валидации (объект настроек)
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);
clearValidation(popupForm, validationConfig);

// изменение аватара

const avatarButton = document.querySelector('.profile__avatar-button');
const avatarForm = document.querySelector('.popup_type_avatar');

avatarButton.addEventListener('click', () => {
  openPopup(avatarForm);
 })

function updateAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = newCardLink.value;
  changeAvatar({ avatar: avatarUrl })
    .then((res) => {
      const avatarImage = document.querySelector('.profile__image');
      avatarImage.style.backgroundImage = `url(${res.result.avatar})`;
    })
    .catch((error) => {
      console.error(error);
    });
  closePopup(avatarForm);
}

avatarForm.addEventListener('submit', updateAvatar);

// Загрузка информации о пользователе с сервера и Загрузка карточек с сервера

Promise.all([getProfileData(), getCards()])
.then(([result, data]) => {
  const name = result.name;
  const about = result.about;
  const userID = result._id;
  const userAvatar = result.avatar;
  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${userAvatar})`; 
  console.log({result, data})

  Array.from(data).forEach((card) => {
    const dataCard = {
      name: card.name,
      link: card.link,
      likes: card.likes.length,
      owner: card.owner._id,
      _id: card._id
    };
    placesList.append(createCard(dataCard, deleteCard, likeCard, openImageCard, userID));
  });
});