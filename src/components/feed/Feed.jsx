import React from "react";
import "./feed.css";

import { Posts } from "../../dummyData";

import Post from "../post/Post";

import Share from "../share/Share";

export default function Feed() {
  return (
    <div className="feed feed__container">
      <div className="feed__wrapper">
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} {...post}/>
        ))}
      </div>
    </div>
  );
}
