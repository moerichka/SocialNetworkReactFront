import React, { useState, useEffect } from "react";
import "./post.css";
import axios from "axios";
import {Link} from "react-router-dom"
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import ru from "timeago.js/lib/lang/ru";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Post(props) {
  const [like, setLike] = useState({
    count: props.likes.length,
    favored: false,
  });
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  timeago.register("ru", ru);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${props.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [props.userId]);

  function likeDislike() {
    if (like.favored) {
      setLike((prev) => ({
        count: prev.count - 1,
        favored: !prev.favored,
      }));
    } else {
      setLike((prev) => ({
        count: prev.count + 1,
        favored: !prev.favored,
      }));
    }
  }

  function getLikeStr(likes) {
    let str = `${likes}`;
    const regExp = /[2-5]$/;
    const regExpForOne = /1$/;

    if (regExpForOne.test(str)) {
      return str + " лайк";
    } else {
      return (str += regExp.test(str) ? " лайка" : " лайков");
    }
  }

  function getCommentStr(comments) {
    let str = `${comments}`;
    const regExp = /[2-5]$/;
    const regExpForOne = /1$/;

    if (regExpForOne.test(str)) {
      return str + " комментарий";
    } else {
      return (str += regExp.test(str) ? " комментария" : " комментариев");
    }
  }

  return (
    <div className="post">
      <div className="post__wrapper">
        <div className="post__top">
          <div className="post__topLeft">
            <Link to={`/profile/${user._id}`}>
              <img
                className="post__profileImage"
                onDoubleClick={likeDislike}
                src={`${PF}${user.profilePicture || "person/no-avatar.png"}`}
                alt=""
              />
            </Link>
            <div className="post__namedateWrapper">
              <span className="post__userName">{user.username}</span>
              <TimeAgo className="post__date" datetime={props.createdAt} locale="ru" />
            </div>
          </div>
          <div className="post__topRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="post__center">
          <span className="post__text">{props?.desc}</span>
          <img src={PF + props?.img} className="post__image" alt="" />
        </div>
        <div className="post__bottom">
          <div className="post__bottomLeft">
            {like.favored ? (
              <FavoriteIcon onClick={likeDislike} className="post__heart" />
            ) : (
              <FavoriteBorderIcon
                onClick={likeDislike}
                className="post__heart"
              />
            )}
            <span className="post__likeCounter">{getLikeStr(like.count)}</span>
          </div>
          <div className="post_bottomRight">
            <span className="post__comments">
              {getCommentStr(props.comment)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
