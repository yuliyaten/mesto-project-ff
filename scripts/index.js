// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
 const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
 const deleteCardButton = cardElement.querySelector('.card__delete-button');

 cardElement.querySelector('.card__image').src = card.link;
 cardElement.querySelector('.card__title').textContent = card.name;

 deleteCardButton.addEventListener('click', () => {deleteCard(cardElement)})
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