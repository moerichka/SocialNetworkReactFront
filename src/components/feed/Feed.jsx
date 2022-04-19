import React, { useState, useEffect } from "react";
import "./feed.css";
import axios from "axios";

import Post from "../post/Post";
import Share from "../share/Share";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = props.userId
        ? await axios.get(`/posts/profile/${props.userId}`)
        : await axios.get("/posts/timeline/62375a6847dd9221b492f183");
      
      setPosts(res.data);
    };
    fetchPosts();
  }, [props.userId]);

  return (
    <div className="feed feed__container">
      <div className="feed__wrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}
