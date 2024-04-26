import { initialCards } from './cards.js';
import { closePopup, openPopup, closePopupByOverlay, closePopupByEsc} from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js';

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

function addCard(card, deleteCard) {
 const cardElement = createCard(card, deleteCard, likeCard, openImageCard);
 placesList.append(cardElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  addCard(card, deleteCard);
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
})

// слушатель на открытие новой карточки
addButton.addEventListener('click', () => {
 openPopup(newCardPopup);
})

// перебор массива всех попапов по оверлею
allPopups.forEach(popup => {
 popup.addEventListener('click', (event) => {
   if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
    closePopupByOverlay(event.currentTarget);
   }
 });
});

// Закрытие модальных окон нажатием на Esc
document.addEventListener('keydown', function(event) {
 if (event.key === 'Escape') {
  closePopupByEsc();
 }
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
}

editProfilePopup.addEventListener('submit', editProfile);

// Добавление карточки
const newCardName = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardLink = newCardPopup.querySelector('.popup__input_type_url');
const newCardForm = newCardPopup.querySelector('.popup__form');

// Функция добавления новой карточки
function newCardSubmit(evt) {
  evt.preventDefault(); 
  const name = newCardName.value;
  const link = newCardLink.value;
  
  const newCard = {
    name: name,
    link: link
  };
  
  const newCardElement = createCard(newCard, deleteCard, likeCard, openImageCard);
  placesList.prepend(newCardElement);
  newCardForm.reset();
  closePopup(newCardPopup);
}

newCardForm.addEventListener('submit', newCardSubmit);
