import React, {useState, useEffect} from "react";
import "./message.css";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import ru from "timeago.js/lib/lang/ru";
import axios from "axios";

function Message(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null)
  timeago.register("ru", ru);

  useEffect(()=>{
    const getUser = async ()=>{
      try {
        const res = await axios(`/users?userId=${props.sender}`)
        setUser(res.data)
      } catch (error) {
        console.log('error: ', error);
      }
    }
    getUser()
  }, [props.sender])

  return (
    <div className={`message ${props.own ? "own" : ""}`}>
      <div className="message__top">
        <img src={`${PF}${user?.profilePicture ? user?.profilePicture : "/person/no-avatar.png"}`} alt="" className="message__img" />
        <p className="message__text">{props.text}</p>
      </div>
      <div className="message__bottom">
        <TimeAgo
          className="post__date"
          datetime={props.createdAt}
          locale="ru"
        />
      </div>
    </div>
  ); 
}

export default Message;
