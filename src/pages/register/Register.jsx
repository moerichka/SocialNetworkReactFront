import React from "react";
import "./register.css";

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
            <button className="register__button">Уже есть аккаунт?</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
