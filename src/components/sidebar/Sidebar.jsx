import React from "react";
import "./sidebar.css";

import { Link } from "react-router-dom";

import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import QuizIcon from "@mui/icons-material/Quiz";
import ChatIcon from "@mui/icons-material/Chat";

import Online from "../online/Online";

import { Users } from "../../dummyData";

const Sidebar = () => {
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
          <li className="sidebar__listItem">
            <ChatIcon />
            <span className="listItem__text">Чаты</span>
          </li>
          <li className="sidebar__listItem">
            <PeopleIcon />
            <span className="sidebar__listItemText">Друзья</span>
          </li>
          <li className="sidebar__listItem">
            <GroupsIcon />
            <span className="sidebar__listItemText">Группы</span>
          </li>
          <li className="sidebar__listItem">
            <QuizIcon />
            <span className="sidebar__listItemText">Тесты</span>
          </li>
        </ul>
        <hr className="sidebar__hr" />
        <ul className="sidebar__friendList">
          {Users.map((u) => (
            <Online key={u.id} {...u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
