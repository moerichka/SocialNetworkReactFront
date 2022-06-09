import React, { useContext, useState, useEffect } from "react";
import "./sidebar.css";
import axios from "axios";

import { Link } from "react-router-dom";

import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import QuizIcon from "@mui/icons-material/Quiz";
import ChatIcon from "@mui/icons-material/Chat";

import Online from "../online/Online";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friends = await axios.get(`/users/friends/${user._id}`);
        setFriends(friends.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getFriends();
  }, [user._id]);

  return (
    <div className="sidebar sidebar__container">
      <div className="sidebar__wrapper">
        <ul className="sidebar__list">
          <Link to="/">
            <li className="sidebar__listItem">
              <ArticleIcon />
              <span className="listItem__text">Новости</span>
            </li>
          </Link>
          <Link to="/messenger">
            <li className="sidebar__listItem">
              <ChatIcon />
              <span className="listItem__text">Чаты</span>
            </li>
          </Link>
          <li className="sidebar__listItem">
            <PeopleIcon />
            <span className="sidebar__listItemText">Друзья</span>
          </li>
          <li className="sidebar__listItem">
            <GroupsIcon />
            <span className="sidebar__listItemText">Группы</span>
          </li>
          <Link to="/tests">
            <li className="sidebar__listItem">
              <QuizIcon />
              <span className="sidebar__listItemText">Тесты</span>
            </li>
          </Link>
        </ul>
        <hr className="sidebar__hr" />
        <ul className="sidebar__friendList">
          {friends.map((friend) => (
            <Online key={friend._id} {...friend} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
