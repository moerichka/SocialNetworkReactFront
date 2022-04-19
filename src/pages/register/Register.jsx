import React from "react";
import "./register.css";

import { Link } from "react-router-dom";

function Register() {
  const subminHundler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <div className="register__left">
        <h3 className="register__logo">Social Class</h3>
        <span className="register__desc">
          Социальное пространство, где можно общаться и делиться успехами!
        </span>
      </div>
      <div className="register__right">
        <h3 className="register__formTitle">Регистрация</h3>
        <div className="register__formWrapper">
          <form onSubmit={subminHundler} className="register__form">
            <input
              type="text"
              name="surname"
              className="register__input"
              placeholder="Никнейм"
            />
            <div className="register__nameWrapper">
              <input
                type="text"
                name="Name"
                className="register__input"
                placeholder="Имя"
              />
              <input
                type="text"
                name="LastName"
                className="register__input"
                placeholder="Фамилия"
              />
            </div>
            <input
              type="text"
              name="email"
              className="register__input"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              className="register__input"
              placeholder="Пароль"
            />
            <input
              type="password"
              name="password-again"
              className="register__input"
              placeholder="Повторите пароль"
            />
            <button className="register__button">Зарегестрироваться</button>
          </form>
          <div className="register__otherOptions">
            <Link to="/login">
              <button className="register__button">Уже есть аккаунт?</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
