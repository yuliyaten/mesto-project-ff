import { putLike, removeLike, deleteCards } from "./api.js";

export function createCard (card, openImageCard, userId) {

 const cardTemplate = document.querySelector('#card-template').content;
 const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
 const cardImage = cardElement.querySelector('.card__image');
 
 cardImage.src = card.link; 
 cardImage.alt = card.name;
 cardElement.querySelector('.card__title').textContent = card.name;
 const cardId = card._id;
 
 const deleteCardButton = cardElement.querySelector('.card__delete-button');
 
 if (card.owner._id !== userId) {
  deleteCardButton.style.display = 'none';
} else {
  deleteCardButton.addEventListener('click', () => {
    deleteCards(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error(error);
    });
  });
}

cardImage.addEventListener('click', () => openImageCard(card.link, card.name));

const likeCounter = cardElement.querySelector('.card__like-counter');
likeCounter.textContent = card.likes.length;

// Поставить лайк карточки
const likeButton = cardElement.querySelector('.card__like-button');

if (card.likes.some(like => like._id === userId)) {
  likeButton.classList.add('card__like-button_is-active');
}

likeButton.addEventListener('click', (evt) => {
  const isLiked = evt.target.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    removeLike(cardId)
    .then((updatedCard) => {
      evt.target.classList.remove('card__like-button_is-active');
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.error(error);
    });
  } else {
    putLike(cardId)
    .then((updatedCard) => {
      evt.target.classList.add('card__like-button_is-active');
      likeCounter.textContent = updatedCard.likes.length;;
      })
      .catch((error) => {
        console.error(error);
      });
    }
  });
 return cardElement;
}

