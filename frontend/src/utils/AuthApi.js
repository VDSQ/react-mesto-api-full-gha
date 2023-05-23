import { authApiConfig } from "./utils";

class AuthApi {
  constructor(config) {
    this._config = config;
  }

  _parseResult = (result) => {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(result.status);
  };

  register(email, password) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.signUp}`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((result) => this._parseResult(result));
  }

  login(email, password) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.signIn}`, {
      method: "POST",
      headers: this._config.headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((result) => this._parseResult(result));
  }

  checkUserAuthToken(token) {
    const headers = this._config.headers;

    return fetch(`${this._config.baseUrl}${this._config.endpoints.usersMe}`, {
      method: "GET",
      headers: headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }
}

const authApi = new AuthApi(authApiConfig);
export default authApi;
