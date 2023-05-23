class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _parseResult = (result) => {
    if (result) {
      return result.json();
    }

    return Promise.reject("Ошибка: ".concat(result.status));
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}$/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((result) => this._parseResult(result));
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((result) => this._parseResult(result));
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }

  setCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((result) => this._parseResult(result));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }

  deleteLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.likeCard(id) : this.deleteLikeCard(id);
  }
}

const api = new Api("https://api.mesto-example.nomoredomains.monster", {
  "Content-Type": "application/json",
});
export default api;
