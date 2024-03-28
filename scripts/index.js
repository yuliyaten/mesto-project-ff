// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки

function getCard(card, deleteCard) {
 
 const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

 const cardImage = cardElement.querySelector('.card__image');
 cardImage.src = card.link; 
 cardImage.alt = card.name;
 cardElement.querySelector('.card__title').textContent = card.name;

 const deleteCardButton = cardElement.querySelector('.card__delete-button');
 deleteCardButton.addEventListener('click', () => deleteCard(cardElement));
 return cardElement;
}

function createCard(card, deleteCard) {
 const cardElement = getCard(card, deleteCard);
 placesList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
 cardElement.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
 createCard(initialCards[i], deleteCard);
}