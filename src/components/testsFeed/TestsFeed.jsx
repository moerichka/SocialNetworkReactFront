import React, { useState, useEffect } from "react";
import s from "./testsFeed.module.css";

import axios from "axios";

import Test from "../test"

function TestsFeed() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const getTests = async () => {
      try {
        const res = await axios.get("/tests");

        setTests(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getTests();
  }, []);

  return (
    <div>
      <div className={s.feed}>
        <div className={s.feedwrapper}>
          {tests.map((test) => (
            <Test key={test._id} {...test} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestsFeed;
