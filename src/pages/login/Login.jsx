import React, { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";

import { UserContext } from "../../context/UserContext";

import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(UserContext);

  const subminHundler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
              required
              className="login__input"
              placeholder="Email"
              ref={email}
            />
            <input
              type="password"
              name="password"
              required
              minLength="6"
              className="login__input"
              placeholder="Пароль"
              ref={password}
            />
            <button className="login__button" disabled={isFetching}>
              {isFetching ? <CircularProgress color="secondary" /> : "Войти"}
            </button>
          </form>
          <div className="login__otherOptions">
            <span className="login__forgotPass">Забыли пароль?</span>
            <button className="login__button" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="secondary" />
              ) : (
                "Создать новый аккаунт"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
