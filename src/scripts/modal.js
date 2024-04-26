export function closePopup(popup) {
 popup.classList.remove('popup_is-opened');
}

export function openPopup(popup) {
 popup.classList.add('popup_is-opened');
}

export function closePopupByOverlay(popup) {
 popup.classList.remove('popup_is-opened');
}

export function closePopupByEsc() {
 const openPopup = document.querySelector('.popup_is-opened');
 if (openPopup) {
  closePopup(openPopup);
 }
}