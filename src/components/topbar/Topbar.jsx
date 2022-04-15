import React from "react";
import "./topbar.css";

import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChatIcon from "@mui/icons-material/Chat";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

const Topbar = () => {
  const [searchQuerry, setSearchQuerry] = React.useState("");
  console.log("searchQuerry: ", searchQuerry);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setSearchQuerry(value);
  };

  return (
    <div className="topbar topbar__container">
      <div className="topbar__left">
        <span className="topbar__logo">Social Class</span>
      </div>
      <div className="topbar__center">
        <div className="topbar__searchbar">
          <SearchIcon />
          <input
            type="text"
            className="topbar__searchInput"
            placeholder="Поиск друзей или контента"
            value={searchQuerry}
            onChange={changeHandler}
            name="searchInput"
          />
        </div>
      </div>
      <div className="topbar__right">
        <div className="topbar__links">
          <span className="topbar__link">Домашняя страница</span>
          <span className="topbar__link">Новости</span>
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
        <img src="/assets/person1.jpg" alt="" className="topbar__image" />
      </div>
    </div>
  );
};

export default Topbar;
