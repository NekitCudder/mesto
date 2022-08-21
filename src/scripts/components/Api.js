export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log('статус ' + res.status));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `${this._headers.authorization}`
      }
    })
      .then(this._checkStatus);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `${this._headers.authorization}`,
      }
    })
      .then(this._checkStatus);
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._headers.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then(this._checkStatus);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._headers.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkStatus);
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._headers.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      }),
    })
      .then(this._checkStatus);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._headers.authorization}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkStatus);
  }

  likePut(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._headers.authorization}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkStatus);
  }

  likeDelete(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._headers.authorization}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkStatus);
  }

}