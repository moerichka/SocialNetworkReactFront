import React, { useState, useEffect, useContext } from "react";
import "./feed.css";
import axios from "axios";

import Post from "../post/Post";
import Share from "../share/Share";
import { UserContext } from "../../context/UserContext";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = props.userId
        ? await axios.get(`/posts/profile/${props.userId}`)
        : await axios.get(`/posts/timeline/${user._id}`);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [props.userId, user._id]);

  return (
    <div className="feed feed__container">
      <div className="feed__wrapper">
        {props.userId ? props.userId === user._id && <Share /> : <Share />}
        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}
