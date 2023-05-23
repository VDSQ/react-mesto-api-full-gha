import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInLink = (
    <Link to="/sign-in" className="auth__register_link">
      Войти
    </Link>
  );

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleEmail}
          required
        />
        <span className="auth__error auth__error_email" />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handlePassword}
          required
        />
        <span className="auth__error auth__error_password" />
        <button className="auth__button auth__button-submit" type="submit">
          Зарегистрироваться
        </button>
        <div className="auth__register">
          <p>Уже зарегистрированы?</p>
          {signInLink}
        </div>
      </form>
    </div>
  );
}

export default Register;
