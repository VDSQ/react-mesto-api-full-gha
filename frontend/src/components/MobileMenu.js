import { Routes, Route, Link } from "react-router-dom";

function MobileMenu({ isOpen, email, onLogout }) {
  const links = (
    <Routes>
      <Route
        path="*"
        element={
          <Link
            to="/sign-in"
            className="mobile-menu__item  mobile-menu__item_logged-out"
            onClick={onLogout}
          >
            Выйти
          </Link>
        }
      />
    </Routes>
  );

  return (
    <div className={`mobile-menu${isOpen ? " mobile-menu_is-opened" : ""}`}>
      <p className="mobile-menu__item mobile-menu__item_email">{email}</p>
      {links}
    </div>
  );
}

export default MobileMenu;
