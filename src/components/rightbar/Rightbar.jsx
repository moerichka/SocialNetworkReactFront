import React from "react";
import "./rightbar.css";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

import Online from "../online/Online";

import { Users } from "../../dummyData";

function Rightbar(props) {
  const ProfileRightBar = () => {
    return (
      <div className="rightbar__userInfo">
        <h4 className="rightbar__title">Информация о пользователе:</h4>
        <div className="rightbar__info">
          <div className="rightbar_infoItem">
            <div className="rightbar_infoName">Город:</div>
            <div className="rightbar_infoValue">Челябинск</div>
          </div>
          <div className="rightbar_infoItem">
            <div className="rightbar_infoName">Школа:</div>
            <div className="rightbar_infoValue">МАОУ СОШ №148</div>
          </div>
          <div className="rightbar_infoItem">
            <div className="rightbar_infoName">Класс:</div>
            <div className="rightbar_infoValue">9</div>
          </div>
          <div className="rightbar_infoItem">
            <div className="rightbar_infoName">Интересы:</div>
            <div className="rightbar_infoValue">
              Аниме, Музыка, Видеогейминг
            </div>
          </div>
        </div>
        <h4 className="rightbar__title">Друзья пользователя:</h4>
        <ul className="rightbar__friendList">
          {Users.map((u) => (
            <Online key={u.id} {...u} rightbar/>
          ))}
        </ul>
      </div>
    );
  };

  const HomeRightBar = () => {
    return (
      <div className="birthday__container birthday">
        <CardGiftcardIcon />
        <span className="birthday__text">
          {" "}
          Сегодня День Рождения у <b>Николя Урия</b> и <b>еще 3 ваших друзей</b>
        </span>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbar__wrapper">
        {props.profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
