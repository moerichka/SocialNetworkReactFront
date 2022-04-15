import React from "react";
import "./login.css";

function Login() {
  const subminHundler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="login__left">
        <h3 className="login__logo">Social Class</h3>
        <span className="login__desc">
          Социальное пространство, где можно общаться и делиться успехами!
        </span>
      </div>
      <div className="login__right">
        <h3 className="login__formTitle">Вход в аккаунт</h3>
        <div className="login__formWrapper">
          <form onSubmit={subminHundler} className="login__form">
            <input
              type="text"
              name="email"
              className="login__input"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              className="login__input"
              placeholder="Пароль"
            />
            <button className="login__button">Войти</button>
          </form>
          <div className="login__otherOptions">
            <span className="login__forgotPass">Забыли пароль?</span>
            <button className="login__button">Создать новый аккаунт</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
