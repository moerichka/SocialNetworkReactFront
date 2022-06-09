import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const username = useRef();
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef()

  const passwordAgainHandler = () =>{
    passwordAgain.current.setCustomValidity('');
  }

  const subminHundler = async (e) => {
    e.preventDefault();

    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Пароли не сопадают");
      return
    } else {
      passwordAgain.current.setCustomValidity('');
    }

    const user = {
      username: username.current.value,
      name: name.current.value,
      surname: surname.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post('/auth/register', user)
      navigate("/login");
    } catch (error) {
      console.log("error: ", error);
    }
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
              name="username"
              className="register__input"
              placeholder="Никнейм"
              ref={username}
              required
            />
            <div className="register__nameWrapper">
              <input
                type="text"
                name="name"
                className="register__input"
                placeholder="Имя"
                ref={name}
                required
              />
              <input
                type="text"
                name="surname"
                className="register__input"
                placeholder="Фамилия"
                ref={surname}
                required
              />
            </div>
            <input
              type="text"
              name="email"
              className="register__input"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              name="password"
              className="register__input"
              placeholder="Пароль"
              ref={password}
              required
              minLength={6}
            />
            <input
              type="password"
              name="password-again"
              className="register__input"
              placeholder="Повторите пароль"
              ref={passwordAgain}
              onChange={passwordAgainHandler}
              required
              minLength={6}
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
