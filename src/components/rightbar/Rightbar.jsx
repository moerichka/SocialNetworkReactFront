import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./rightbar.css";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveIcon from "@mui/icons-material/Remove";
import ChatIcon from '@mui/icons-material/Chat';

import Online from "../online/Online";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function Rightbar(props) {
  const navigate = useNavigate()
  const { user: currentUser, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(userId)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friends = await axios.get(`/users/friends/${userId}`);
        setFriends(friends.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getFriends();
  }, [userId]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${userId}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: userId });
      } else {
        await axios.put(`/users/${userId}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: userId });
      }
    } catch (error) {
      console.log("error: ", error);
    }
    setFollowed((prev) => !prev);
  };

  const dialogHandler = async () => {
    try {
      await axios.post(`/conversations`, {
        senderId: currentUser._id,
        receiverId: userId
      })
      navigate(`/messenger`, {replace: true})
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const ProfileRightBar = () => {
    const user = { ...props.user };

    return (
      <div className="rightbar__userInfo">
        <div className="rightbar__buttonsWrapper">
          {currentUser._id !== userId && (
            <button
              className={`rightbar__followBut ${followed && "unfollow"}`}
              onClick={followHandler}
            >
              {followed ? <RemoveIcon /> : <AddBoxIcon />}
              {followed ? "????????????????????" : "??????????????????????"}
            </button>
          )}
          {currentUser._id !== userId && (
            <button
              className={`rightbar__followBut rightbar__chat`}
              onClick={dialogHandler}
            >
              <ChatIcon /> ???????????? ????????????
            </button>
          )}
        </div>
        <h4 className="rightbar__title">???????????????????? ?? ????????????????????????:</h4>
        <div className="rightbar__info">
          {user.city && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">??????????:</div>
              <div className="rightbar_infoValue">{user.city}</div>
            </div>
          )}
          {user.school && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">??????????:</div>
              <div className="rightbar_infoValue">{user.school}</div>
            </div>
          )}
          {user.class && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">??????????:</div>
              <div className="rightbar_infoValue">{user.class}</div>
            </div>
          )}
          {!!user.interests?.length && (
            <div className="rightbar_infoItem">
              <div className="rightbar_infoName">????????????????:</div>
              <div className="rightbar_infoValue">
                {!user.interests ? (
                  <span>???????? ????????</span>
                ) : (
                  user.interests.map((interest) => {
                    return <span key={interest}>{interest}</span>;
                  })
                )}
              </div>
            </div>
          )}
        </div>
        <h4 className="rightbar__title">???????????? ????????????????????????:</h4>
        <ul className="rightbar__friendList">
          {friends.map((friend) => (
            <Online key={friend._id} {...friend} rightbar />
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
          ?????????????? ???????? ???????????????? ?? <b>???????????? ????????</b> ?? <b>?????? 3 ?????????? ????????????</b>
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
