import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import "./profile.css";
import axios from "axios";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

function Profile() {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const {userId} = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <Topbar />
      <div className="profile__container">
        <div className="profile__sidebarWrapper">
          <Sidebar />
        </div>
        <div className="profile__mainPart">
          <div className="profile__rightTop">
            <div className="profile__cover">
              <img
                className="profile__coverImage"
                src={`${PF}${user.coverPicture || "person/no-bg-3.png"}`}
                alt=""
              />
              <img
                className="profile__userAvatar"
                src={`${PF}${user.profilePicture || "person/no-avatar.png"}`}
                alt=""
              />
            </div>
            <div className="profile__info">
              <h4 className="profile__name">{user.username}</h4>
              <span className="profile__desc">{user.desc}</span>
            </div>
          </div>
        </div>
        <div className="profile__feedWrapper">
          <Feed userId={userId} />
        </div>
        <div className="profile__rightbarWrapper">
          <Rightbar user={user} />
        </div>
      </div>
    </>
  );
}

export default Profile;
