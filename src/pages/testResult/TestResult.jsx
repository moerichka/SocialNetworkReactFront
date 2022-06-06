import React, { useState, useEffect, useContext } from "react";
import s from "./testResult.module.css";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../context/UserContext";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Testnav from "../../components/testnav/Testnav";

function TestResult() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState([]);
  const [isDataSended, setIsDataSended] = useState(false);
  const [test, setTest] = useState({});
  const { testId } = useParams();

  useEffect(() => {
    const getTest = async () => {
      try {
        const res = await axios.get(`/tests/${testId}`);
        setTest(res.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getTest();
  }, [testId]);

  function handleChange(event, index1, index2 = null) {
    const { name, value, type, checked } = event.target;
    const newAnswer = {
      question: name,
      value: value,
      questionIndex: index1,
      answerIndex: index2,
    };
    setFormData((prevFormData) => {
      prevFormData[index1] = newAnswer;
      return [...prevFormData];
    });
  }

  function rerunHandler() {
    setFormData([]);
    setIsDataSended(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.put(`/tests/${testId}`, {
        userId: user._id,
        answers: formData,
      });
      setIsDataSended(true);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div>
      <Topbar />
      <div className={s.container}>
        <div className={s.sidebarWrapper}>
          <Sidebar />
        </div>
        <div className={s.mainPart}>
          <div className={s.main}>
            <h2 className={s.title}>Результаты теста</h2>
            <div className={s.desc}>{test?.desc}</div>
            <div className={s.questionswrapper}>
              {test?.results?.map((result, index1) => (
                <div
                  className={s.question}
                  key={index1}
                  id={`question${index1}`}
                >
                  <h5 className={s.questiontitle}>
                    Ответы пользователя {index1}.
                  </h5>
                  {result?.answers?.map((answer) => (
                    <div className={s.answerwrapper}>
                      <span className={s.answerq}>Вопрос: {answer?.question}</span>
                      <span className={s.answera}>Ответ: {answer?.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.rightbarWrapper}>
          <div className={s.rightbar}>
            <Testnav test={{questions: test?.results}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResult;
