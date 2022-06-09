import React, { useState, useEffect, useContext } from "react";
import s from "./test.module.css";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../context/UserContext";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Testnav from "../../components/testnav/Testnav";

function Test() {
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
            <h2 className={s.title}>Прохождение теста</h2>
            <div className={s.desc}>{test?.desc}</div>
            <div className={s.questionswrapper}>
              {test?.questions?.map((question, index1) => (
                <div
                  className={s.question}
                  key={index1}
                  id={`question${index1}`}
                >
                  <h5 className={s.questiontitle}>
                    {" "}
                    {index1}. {question?.title}
                  </h5>
                  <p className={s.questiontext}>{question?.question}</p>

                  {question?.type === "text" && (
                    <input
                      placeholder="Напишите:"
                      className={s.inputtext}
                      type="text"
                      id={`${index1}:${question?.type}`}
                      name={`${index1} ${question?.question}`}
                      value={formData[index1]?.value}
                      onChange={(e) => {
                        handleChange(e, index1);
                      }}
                    />
                  )}
                  {question?.type === "radio" &&
                    question?.options?.map((option, index2) => (
                      <fieldset className={s.questionwrapper}>
                        <div key={index1 + index2}>
                          <input
                            className={s.inputradio}
                            type="radio"
                            id={`${index1}:${index2}`}
                            name={`${index1} ${question?.question}`}
                            value={option}
                            checked={formData[index1]?.value === option}
                            onChange={(e) => {
                              handleChange(e, index1, index2);
                            }}
                          />
                          <label
                            className={s.answer}
                            htmlFor={`${index1}:${index2}`}
                          >
                            {option}
                          </label>
                        </div>
                      </fieldset>
                    ))}
                </div>
              ))}
              {isDataSended ? (
                <div className={s.buttonswrapper}>
                  <p className={s.congrat}>Данные были успешно отправлены!</p>
                  <button
                    className={`${s.submit} ${s.submit2}`}
                    onClick={rerunHandler}
                  >
                    Желаете пройти снова?
                  </button>
                </div>
              ) : (
                <button className={s.submit} onClick={handleSubmit}>
                  Отправить результат
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={s.rightbarWrapper}>
          <div className={s.rightbar}>
            <Testnav test={test} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
