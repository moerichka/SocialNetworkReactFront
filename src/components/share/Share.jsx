import React from "react";
import "./share.css";

import AddBoxIcon from '@mui/icons-material/AddBox';

function Share() {
  return (
    <div className="share">
      <div className="share__wrapper">
        <div className="share__top">
          <img
            src="/assets/person/person1.jpg"
            alt=""
            className="share__profileImage"
          />
          <input
            type="text"
            name=""
            placeholder="Чем бы ты хотел поделиться?"
            className="share__input"
            id=""
          />
        </div>
        <hr className="share__hr" />
        <div className="share__bottom">
          <div className="share__options">
            <div className="share__option">
              <AddBoxIcon />
              <span className="share__optionText">Фото или Видео</span>
            </div>
          </div>
          <button className="share__button">Поделиться</button>
        </div>
      </div>
    </div>
  );
}

export default Share;
