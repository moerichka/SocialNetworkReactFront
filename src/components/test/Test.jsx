import React, { useState, useEffect, useContext } from "react";
import s from "./test.module.css";

import { Link } from "react-router-dom";
import axios from "axios";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import ru from "timeago.js/lib/lang/ru";

import { UserContext } from "../../context/UserContext";

import MoreVertIcon from "@mui/icons-material/MoreVert";

function Test(props) {
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(UserContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  timeago.register("ru", ru);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${props.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [props.userId]);

  return (
    <div className={s.test}>
      <div className={s.wrapper}>
        <div className={s.top}>
          <div className={s.topLeft}>
            <Link to={`/profile/${user._id}`}>
              <img
                className={s.profileImage}
                src={`${PF}${user.profilePicture || "/person/no-avatar.png"}`}
                alt=""
              />
            </Link>
            <div className={s.namedateWrapper}>
              <span className={s.userName}>{user.username}</span>
              <TimeAgo
                className={s.date}
                datetime={props.createdAt}
                locale="ru"
              />
            </div>
          </div>
          <div className={s.topRight}>
            <MoreVertIcon />
          </div>
        </div>
        <div className={s.center}>
          <span className={s.text}>{props?.desc}</span>
          <div className={s.buttons}>
            <Link to={`/test/${props._id}`} className={s.pass}>Пройти тест?</Link>
            {currentUser._id === props.userId && (
              <Link to={`/test/result/${props._id}`} className={s.pass}>Посмотреть результаты</Link>
            )}
          </div>
        </div>
        <div className={s.bottom}></div>
      </div>
    </div>
  );
}

export default Test;
