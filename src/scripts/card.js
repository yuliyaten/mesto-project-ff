import { putLike, removeLike } from "./api";

export function createCard(card, deleteCard, likeCard, openImageCard, userID) {

 const cardTemplate = document.querySelector('#card-template').content;
 const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
 const cardImage = cardElement.querySelector('.card__image');
 
 cardImage.src = card.link; 
 cardImage.alt = card.name;
 cardElement.querySelector('.card__title').textContent = card.name;
 
 const deleteCardButton = cardElement.querySelector('.card__delete-button');
 deleteCardButton.addEventListener('click', () => deleteCard(cardElement));
 
 cardImage.addEventListener('click', () => openImageCard(card.link, card.name));
 
 const likeCounter = cardElement.querySelector('.card__like-counter');
 likeCounter.textContent = card.likes;

 // Поставить лайк карточки
 const likeButton = cardElement.querySelector('.card__like-button');
 likeButton.addEventListener('click', (evt) => {
  const cardId = card._id;
  const isLiked = evt.target.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    removeLike(cardId)
    .then(() => {
      evt.target.classList.remove('card__like-button_is-active');
      likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
    })
    .catch((error) => {
      console.error(error);
    });
  } else {
    putLike(cardId)
    .then(() => {
      evt.target.classList.add('card__like-button_is-active');
      likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
      })
      .catch((error) => {
        console.error(error);
      });
    }
  });

 if (card.owner !== userID) {
  deleteCardButton.style.display = 'none';
 }

 return cardElement;
}

export function likeCard(evt) {
  evt.target.classList.contains('card__like-button_is-active');
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
