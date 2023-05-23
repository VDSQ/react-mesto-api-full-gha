class AuthApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _parseResult = (result) => {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(result.status);
  };

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((result) => this._parseResult(result));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((result) => this._parseResult(result));
  }

  checkUserAuthToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((result) => this._parseResult(result));
  }
}

const authApi = new AuthApi("https://api.mesto-example.nomoredomains.monster", {
  "Content-Type": "application/json",
});
export default authApi;
