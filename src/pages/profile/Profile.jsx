import React from "react";
import "./profile.css";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

function Profile() {
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
                    <img className="profile__coverImage" src="/assets/post/post1.jpg" alt="" />
                    <img className="profile__userAvatar" src="/assets/person/person1.jpg" alt="" />
                </div>
                <div className="profile__info">
                    <h4 className="profile__name">Исаков Михаил</h4>
                    <span className="profile__desc">Я люблю аниме и что ты мне сделаешь?</span>
                </div>
            </div>
        </div>
        <div className="profile__feedWrapper">
            <Feed />
        </div>
        <div className="profile__rightbarWrapper">
            <Rightbar profile/>
        </div>
      </div>
    </>
  );
}

export default Profile;
