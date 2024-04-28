export function closePopup(popup) {
 popup.classList.remove('popup_is-opened');
 document.removeEventListener('keydown', closePopupByEscape);
}

export function openPopup(popup) {
 popup.classList.add('popup_is-opened');
 document.addEventListener('keydown', closePopupByEscape);
}

export function closePopupByOverlay(popup) {
 popup.classList.remove('popup_is-opened');
}

// Закрытие модальных окон нажатием на Esc
const closePopupByEscape = event => {
 if (event.key === 'Escape') { 
  const openPopup = document.querySelector('.popup_is-opened'); 
  if (openPopup) { 
   closePopup(openPopup);
  }
 } 
}
