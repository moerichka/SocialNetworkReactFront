import React from "react";
import "./rightbar.css";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

import Online from "../online/Online";

import { Users } from "../../dummyData";

function Rightbar(props) {
  const ProfileRightBar = () => {
    const user = { ...props.user };

    return (
      <div className="rightbar__userInfo">
        <h4 className="rightbar__title">Информация о пользователе:</h4>
        <div className="rightbar__info">
          {user.city && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">Город:</div>
              <div className="rightbar_infoValue">{user.city}</div>
            </div>
          )}
          {user.school && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">Школа:</div>
              <div className="rightbar_infoValue">{user.school}</div>
            </div>
          )}
          {user.class && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">Класс:</div>
              <div className="rightbar_infoValue">{user.class}</div>
            </div>
          )}
          {!!user.interests?.length && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">Интересы:</div>
              <div className="rightbar_infoValue">
                {!user.interests ? (
                  <span>Пока нету(</span>
                ) : (
                  user.interests.map((interest) => {
                    return <span key={interest}>{interest}</span>;
                  })
                )}
              </div>
            </div>
          )}
        </div>
        <h4 className="rightbar__title">Друзья пользователя:</h4>
        <ul className="rightbar__friendList">
          {Users.map((u) => (
            <Online key={u.id} {...u} rightbar />
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
        {props.user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
