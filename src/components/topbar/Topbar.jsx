import React, { useContext, useState, useEffect } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Select from "react-select";
import { createOptions } from "../../helpers/arrayFun";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChatIcon from "@mui/icons-material/Chat";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

const Topbar = () => {
  const [chosenFriend, setChosenFriend] = useState(null);
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/users/getall");
        setUsers(res.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getUsers();
  }, []);

  const usersOptions = users?.length > 1 && createOptions(users, "username", "_id");

  const selectHandler = (selected) => {
    setChosenFriend(selected);
  };

  return (
    <div className="topbar topbar__container">
      <div className="topbar__left">
        <Link to="/" className="topbar__link">
          <span className="topbar__logo">Social Class</span>
        </Link>
      </div>
      <div className="topbar__center">
        <div className="topbar__searchbar">
          <SearchIcon className="topbar__search" onClick={()=>navigate(`/profile/${chosenFriend.value}`)}/>
          {/* <input
            type="text"
            className="topbar__searchInput"
            placeholder="Поиск друзей или контента"
            value={searchQuerry}
            onChange={changeHandler}
            name="searchInput"
          /> */}
          <Select
            placeholder="Найти пользователя"
            options={usersOptions}
            classNamePrefix="topbar"
            className="topbar__searchInput"
            defaultValue={chosenFriend}
            value={chosenFriend}
            onChange={selectHandler}
          />
        </div>
      </div>
      <div className="topbar__right">
        <div className="topbar__links">
          {/* <span className="topbar__link">Домашняя страница</span>
          <span className="topbar__link">Новости</span> */}
        </div>
        <div className="topbar__icons">
          <div className="topbar__iconItem">
            <AccountBoxIcon />
            <span className="topbar__iconBadge">1</span>
          </div>
          <div className="topbar__iconItem">
            <ChatIcon />
            <span className="topbar__iconBadge">3</span>
          </div>
          <div className="topbar__iconItem">
            <CircleNotificationsIcon />
            <span className="topbar__iconBadge">2</span>
          </div>
        </div>
        <Link to={`/profile/${user._id}`}>
          <img
            src={`${PF}${user.profilePicture || "/person/no-avatar.png"}`}
            alt=""
            className="topbar__image"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
