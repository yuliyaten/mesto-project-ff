// Загрузка информации о пользователе с сервера
const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-15',
  headers: {
    authorization: 'b6d33fb2-0adc-40c5-92ff-643651a748db',
  },
  headersWithContentType: {
    authorization: 'b6d33fb2-0adc-40c5-92ff-643651a748db',
    'Content-Type': 'application/json'
  }
};

export const getProfileData = () => {
 return fetch(`${config.baseUrl}/users/me`, {
   method: 'GET',
   headers: config.headers
 })
 .then(handleResponse)
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse)
};

export const editProfileData = (nameProfile, aboutProfile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headersWithContentType,
    body: JSON.stringify({
      name: nameProfile,
      about: aboutProfile
    })
  })
 .then(handleResponse)
};

export const addNewCard = (cardName, imageUrl) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headersWithContentType,
    body: JSON.stringify({
      name: cardName,
      link: imageUrl
    }),
  })
  .then(handleResponse)
};

export const deleteCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
};

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headersWithContentType,
    body: JSON.stringify({ avatar })
  })
  .then(handleResponse)
};

