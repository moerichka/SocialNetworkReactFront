import React, { useContext, useRef, useState } from "react";
import "./share.css";

import AddBoxIcon from "@mui/icons-material/AddBox";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { UserContext } from "../../context/UserContext";
import axios from "axios";

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);

  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    if(desc.current.value === 0 && !file) return

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post('/upload', data)
        // window.location.reload()
      } catch (error) {
        console.log('error: ', error);
      }
    }

    try {
      await axios.post("/posts", newPost);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="share">
      <form className="share__wrapper" onSubmit={submitHandler}>
        <div className="share__top">
          <img
            src={`${PF}${user.profilePicture || "/person/no-avatar.png"}`}
            alt=""
            className="share__profileImage"
          />
          <input
            type="text"
            name=""
            placeholder="Чем бы ты хотел поделиться?"
            className="share__input"
            ref={desc}
          />
        </div>
        <hr className="share__hr" />
        {file && (
          <div className="share__imageContainer">
            <img src={URL.createObjectURL(file)} alt="" className="share__image" />
            <HighlightOffIcon className="share__imageCancel" onClick={()=> setFile(null)}/>
          </div>
        )}
        <div className="share__bottom">
          <div className="share__options">
            <label htmlFor="file" className="share__option">
              <AddBoxIcon />
              <span className="share__optionText">Фото или Видео</span>
              <input
                className="share__fileInput"
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="share__button">Поделиться</button>
        </div>
      </form>
    </div>
  );
}

export default Share;
