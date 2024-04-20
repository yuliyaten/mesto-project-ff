export function createCard(card, deleteCard, likeCard, openImageCard) {

 const cardTemplate = document.querySelector('#card-template').content;
 const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
 const cardImage = cardElement.querySelector('.card__image');
 
 cardImage.src = card.link; 
 cardImage.alt = card.name;
 cardElement.querySelector('.card__title').textContent = card.name;
 
 const deleteCardButton = cardElement.querySelector('.card__delete-button');
 deleteCardButton.addEventListener('click', () => deleteCard(cardElement));
 
 // Поставить лайк карточки
 const likeButton = cardElement.querySelector('.card__like-button');
 likeButton.addEventListener('click', (evt) => likeCard(evt));
 
 cardImage.addEventListener('click', () => openImageCard(card.link, card.name));
 
 return cardElement;
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
 
export function deleteCard(cardElement) {
  cardElement.remove();
}