import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import MobileMenu from "./MobileMenu";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import authApi from "../utils/AuthApi";

function App() {
  // ----- States -----
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardToDelete, setSelectedCardToDelete] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthStatusSuccess, setIsAuthStatusSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ----- Navigate -----
  const navigate = useNavigate();

  // ----- Server data -----
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userInfo, cardList]) => {
          setCurrentUser(userInfo);
          setCards(cardList);
        })
        .catch((error) =>
          console.error("Данные с сервера не загрузились. ".concat(error))
        );
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const userAuthToken = localStorage.getItem("userAuthToken");

    if (userAuthToken) {
      authApi
        .checkUserAuthToken(userAuthToken)
        .then((result) => {
          setCurrentUser(result);
          setEmail(result.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((statusCode) => {
          if (statusCode === 401) {
            console.error(
              "Токен не передан, передан не в том формате или переданный токен некорректен."
            );
          } else {
            console.error(
              "Ошибка при верификации токена авторизации. ".concat(statusCode)
            );
          }
        });
    }
  }, [email, isLoggedIn, navigate]);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeletePlacePopupOpen ||
    isImageOpen ||
    isTooltipOpen;

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);

      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  // ----- Handlers -----
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick(card_id) {
    setIsDeletePlacePopupOpen(true);
    setSelectedCardToDelete(card_id);
  }

  function handleCardClick(card) {
    setIsImageOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((result) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? result : c))
        );
      })
      .catch((error) =>
        console.error("Не удалось изменить like карточки. ".concat(error))
      );
  }

  function handleUpdateUserSubmit(user) {
    setIsLoading(true);
    api
      .setUserInfo(user)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) =>
        console.error("Данные пользователя не обновились. ".concat(error))
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatarSubmit(avatar) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) =>
        console.error("Аватар пользователя не обновился. ".concat(error))
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .setCard(card)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((error) =>
        console.error("Карточка не загрузилась. ".concat(error))
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDeleteSubmit(card_id) {
    api
      .deleteCard(card_id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card_id));
        closeAllPopups();
      })
      .catch((error) => console.error("Карточка не удалилась. ".concat(error)));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsImageOpen(false);
    setIsTooltipOpen(false);
  }

  function handleRegisterSubmit(email, password) {
    authApi
      .register(email, password)
      .then((result) => {
        setIsAuthStatusSuccess(true);
      })
      .catch((statusCode) => {
        setIsAuthStatusSuccess(false);

        if (statusCode === 400) {
          console.error("Некорректно заполнено одно из полей.");
        } else {
          console.error(
            "Ошибка при регистрации. statusCode=".concat(statusCode)
          );
        }
      })
      .finally(() => {
        setIsTooltipOpen(true);
      });
  }

  function handleLoginSubmit(email, password) {
    authApi
      .login(email, password)
      .then((result) => {
        if (result.token) {
          localStorage.setItem("userAuthToken", result.token);
          setEmail(email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((statusCode) => {
        if (statusCode === 400) {
          console.error("Не передано одно из полей.");
        } else if (statusCode === 401) {
          console.error("Пользователь с email не найден.");
        } else {
          console.error(
            "Ошибка при авторизации. statusCode=".concat(statusCode)
          );
        }
      });
  }

  function handleLogoutClick() {
    localStorage.removeItem("userAuthToken");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  }

  function handleMobileMenuClick() {
    !isMobileMenuOpen ? setIsMobileMenuOpen(true) : setIsMobileMenuOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <MobileMenu
          isOpen={isMobileMenuOpen}
          email={email}
          onLogout={handleLogoutClick}
        />

        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          onLogout={handleLogoutClick}
          isMobileMenuOpen={isMobileMenuOpen}
          onClickMobileMenu={handleMobileMenuClick}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                redirectTo="/sign-in"
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeletePlaceClick}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLoginSubmit} />}
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegisterSubmit} />}
          />
        </Routes>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatarSubmit}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUserSubmit}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          card_id={selectedCardToDelete}
          onDeletePlace={handleCardDeleteSubmit}
        />

        <ImagePopup
          isOpen={isImageOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isAuthStatusSuccess={isAuthStatusSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
