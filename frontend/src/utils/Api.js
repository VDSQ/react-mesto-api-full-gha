import { apiConfig } from "./utils";

class Api {
  constructor(config) {
    this._config = config;
  }

  _parseResult = (result) => {
    if (result) {
      return result.json();
    }

    return Promise.reject("Ошибка: ".concat(result.status));
  };

  getUserInfo() {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.users}`, {
      method: "GET",
      headers: this._config.headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }

  setUserInfo(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.users}`, {
      method: "PATCH",
      headers: this._config.headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((result) => this._parseResult(result));
  }

  setUserAvatar(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.avatar}`, {
      method: "PATCH",
      headers: this._config.headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((result) => this._parseResult(result));
  }

  getCardList() {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.cards}`, {
      method: "GET",
      headers: this._config.headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }

  setCard(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.cards}`, {
      method: "POST",
      headers: this._config.headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((result) => this._parseResult(result));
  }

  deleteCard(id) {
    return fetch(
      `${this._config.baseUrl}${this._config.endpoints.cards}/${id}`,
      {
        method: "DELETE",
        headers: this._config.headers,
        credentials: "include",
      }
    ).then((result) => this._parseResult(result));
  }

  likeCard(id) {
    return fetch(
      `${this._config.baseUrl}${this._config.endpoints.likes}/${id}`,
      {
        method: "PUT",
        headers: this._config.headers,
        credentials: "include",
      }
    ).then((result) => this._parseResult(result));
  }

  deleteLikeCard(id) {
    return fetch(
      `${this._config.baseUrl}${this._config.endpoints.likes}/${id}`,
      {
        method: "DELETE",
        headers: this._config.headers,
        credentials: "include",
      }
    ).then((result) => this._parseResult(result));
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.likeCard(id) : this.deleteLikeCard(id);
  }
}

const api = new Api(apiConfig);
export default api;
