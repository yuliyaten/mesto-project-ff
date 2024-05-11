// Загрузка информации о пользователе с сервера
const handleResponse = (response) => {
 if (response.ok) {
  return response.json();
 }
}

export const getProfileData = () => {
 return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
   method: 'GET',
   headers: {
     authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db'
   }
 })
 .then(handleResponse)
 .catch(error => {
  return Promise.reject(`Ошибка: ${error.status}`);
});
};

export const getCards = () => {
 return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
 method: 'GET',
 headers: {
   authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db'
  },
 })
 .then(handleResponse)
 .catch(error => {
  return Promise.reject(`Ошибка: ${error.status}`);
});
};

export const editProfileData = (nameProfile, aboutProfile) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
  method: 'PATCH',
  headers: {
   authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db',
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameProfile,
    about: aboutProfile
  })
})
 .then(handleResponse)
 .catch(error => {
  return Promise.reject(`Ошибка: ${error.status}`);
});
};

export const addNewCard = (cardName, imageUrl) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
    method: 'POST',
    headers: {
      authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: imageUrl
    }),
  })
  .then(handleResponse)
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  });
};

export const deleteCards = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db',
    },
  })
  .then(handleResponse)
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  });
}

export const putLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db'
    },
  })
  .then(handleResponse)
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  });
};

export const removeLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db'
    },
  })
  .then(handleResponse)
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  });
};

export const changeAvatar = (avatar) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/users/me/avatar`, {
    method: 'PATCH',
    headers: { 
      authorization: '085c5d26-7525-4380-ab28-1d7ea8f438db',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(avatar)
  })
  .then(handleResponse)
  .then(result => {  
    profileAvatar.style.backgroundImage = `url(${result.avatar})`; 
  })
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  });
};

