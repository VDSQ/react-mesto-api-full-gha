// ----- Api -----
export const apiConfig = {
  baseUrl: "https://api.mesto-example.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
  endpoints: {
    users: "/users/me",
    avatar: "/users/me/avatar",
    cards: "/cards",
    likes: "/cards/likes",
  },
};

// ----- AuthApi -----
export const authApiConfig = {
  baseUrl: "https://api.mesto-example.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
  endpoints: {
    signUp: "/signup",
    signIn: "/signin",
    usersMe: "/users/me",
  },
};
