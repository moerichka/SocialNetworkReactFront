import React from "react";
import "./online.css";
import {Link} from 'react-router-dom'

function Online(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Link className="friend__link" to={`/profile/${props._id}`}>
        <li className={props.rightbar ? "friend-column" : "friend"}>
          <div className="friend__imageContainer">
            <img
              className={
                props.rightbar ? "friend__image-rightangle" : "friend__image"
              }
              src={`${PF}${props.profilePicture || "/person/no-avatar.png"}`}
              alt=""
            />
            {!props.rightbar && <span className="friend__online"></span>}
          </div>
          <span className="friend__name">{props.username}</span>
        </li>
      </Link>
    </>
  );
}

export default Online;
