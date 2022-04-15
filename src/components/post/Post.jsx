import React, { useState } from "react";
import "./post.css";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Users } from "../../dummyData";

function Post(props) {
  const [like, setLike] = useState({ count: props.like, favored: false });

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
            <img
              className="post__profileImage"
              onDoubleClick={likeDislike}
              src={
                Users.filter((u) => u.id === props?.userId)[0]?.profilePicture
              }
              alt=""
            />
            <span className="post__userName">
              {Users.filter((u) => u.id === props?.userId)[0].username}
            </span>
            <span className="post__date">{props.date}</span>
          </div>
          <div className="post__topRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="post__center">
          <span className="post__text">{props?.desc}</span>
          <img src={props?.img} className="post__image" alt="" />
        </div>
        <div className="post__bottom">
          <div className="post__bottomLeft">
            {like.favored ? (
              <FavoriteIcon onClick={likeDislike} className="post__heart"/>
            ) : (
              <FavoriteBorderIcon onClick={likeDislike} className="post__heart"/>
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
