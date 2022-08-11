export class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log('статусссссссс'+res.status));
  }

  getInitialCards() { }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,{
      method: 'GET',
      headers:{
        authorization: this._headers
      }
    })
    .then(this._checkStatus);
  }
}