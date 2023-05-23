import { Fragment } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logoImage from "../images/logo.svg";
import burgerButton from "../images/button-burger.svg";
import closeButton from "../images/button-close.svg";

function Header({
  isLoggedIn,
  email,
  onLogout,
  isMobileMenuOpen,
  onClickMobileMenu,
}) {
  const logo = (
    <Routes>
      <Route
        path="*"
        element={
          <Link to="/" className="header__link">
            <img src={logoImage} alt="Место Россия" className="header__logo" />
          </Link>
        }
      />
    </Routes>
  );

  const notLoggedInMenu = (
    <Routes>
      <Route
        path="/sign-up"
        element={
          <Link to="/sign-in" className="header__menu-item">
            Войти
          </Link>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Link to="/sign-up" className="header__menu-item">
            Регистрация
          </Link>
        }
      />
    </Routes>
  );

  const loggedInMenu = (
    <Fragment>
      <p className="header__menu-item header__menu-item_email">{email}</p>
      <Routes>
        <Route
          path="*"
          element={
            <Link
              to="/sign-in"
              className="header__menu-item header__menu-item_logged-out"
              onClick={onLogout}
            >
              Выйти
            </Link>
          }
        />
      </Routes>
      <button
        className="header__burger"
        style={{
          backgroundImage: `url(${
            !isMobileMenuOpen ? burgerButton : closeButton
          })`,
        }}
        onClick={onClickMobileMenu}
      />
    </Fragment>
  );

  return (
    <header className="header">
      <div className="header__container">
        {logo}
        <div className="header__menu">
          {isLoggedIn ? loggedInMenu : notLoggedInMenu}
        </div>
      </div>
    </header>
  );
}

export default Header;
