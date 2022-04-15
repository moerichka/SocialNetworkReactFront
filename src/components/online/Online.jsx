import React from "react";
import "./online.css";

function Online(props) {
  return (
    <>
      <li className={props.rightbar ? "friend-column" : "friend"}>
        <div className="friend__imageContainer">
          <img
            className={
              props.rightbar ? "friend__image-rightangle" : "friend__image"
            }
            src={props.profilePicture}
            alt=""
          />
          {!props.rightbar && <span className="friend__online"></span>}
        </div>
        <span className="friend__name">{props.username}</span>
      </li>
    </>
  );
}

export default Online;
