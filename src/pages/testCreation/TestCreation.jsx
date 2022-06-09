import React, { useContext, useEffect, useState, useRef } from "react";
import s from "./testCreation.module.css";

import { Link } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../context/UserContext";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Testnav from "../../components/testnav/Testnav";

function TestCreation() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState([]);
  const descData = useRef(null);
  const [isDataSended, setIsDataSended] = useState(false);

  function handleChange(event, index1, index2 = null) {
    const { name, value, type, checked } = event.target;
    let newQuestion = formData[index1];
    newQuestion[name] = value;

    setFormData((prevFormData) => {
      prevFormData[index1] = newQuestion;
      return [...prevFormData];
    });
  }

  function rerunHandler() {
    setFormData([]);
    setIsDataSended(false);
  }

  function switchType(event, index) {
    const { name, value, type, checked } = event.target;
    let newType = formData[index];
    newType.type = value;
    setFormData((prevFormData) => {
      prevFormData[index] = newType;
      return [...prevFormData];
    });
  }

  function addQuestionHandler() {
    setFormData((prev) => [
      ...prev,
      { title: "", question: "", type: "text", factor: 1, options: [] },
    ]);
  }

  function changeAnswerVarient(event, index, index2) {
    const { name, value, type, checked } = event.target;
    let newVarients = formData[index];
    newVarients.options[index2] = value;

    setFormData((prevFormData) => {
      prevFormData[index] = newVarients;
      return [...prevFormData];
    });
  }

  function addVarient(event, index) {
    let newVarients = formData[index];
    newVarients?.options?.push("");

    setFormData((prevFormData) => {
      prevFormData[index] = newVarients;
      return [...prevFormData];
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(`/tests`, {
        userId: user._id,
        desc: descData.current.value,
        questions: formData,
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
            <h2 className={s.title}>Конструктор теста</h2>
            <div className={s.desc}>
              <h5 className={s.desctitle}>Добавьте опиисание вашего теста:</h5>
              <input
                type="text"
                name="desc"
                ref={descData}
                id=""
                placeholder="Напишите:"
                className={s.inputtext}
              />
            </div>
            <div className={s.questionswrapper}>
              {formData?.map((question, index1) => (
                <div
                  className={s.question}
                  key={index1}
                  id={`question${index1}`}
                >
                  <div className={s.topinputs}>
                    <h5 className={s.questiontitle}>
                      {" "}
                      {index1}. Можете озаглавить свой вопрос:
                    </h5>
                    <input
                      type="text"
                      name="title"
                      id=""
                      placeholder="Напишите:"
                      className={s.inputtext}
                      onChange={(e) => handleChange(e, index1)}
                    />
                    <p className={s.questiontext}>Задайте свой вопрос:</p>
                    <input
                      type="text"
                      name="question"
                      id=""
                      placeholder="Напишите:"
                      className={s.inputtext}
                      onChange={(e) => handleChange(e, index1)}
                    />
                  </div>
                  <fieldset className={s.questionwrapper}>
                    <label>Выберите формат ответа:</label>
                    <div>
                      <input
                        className={s.inputradio}
                        type="radio"
                        id={`radio${index1}`}
                        name={`radio${index1}`}
                        value={"radio"}
                        checked={formData[index1]?.type === "radio"}
                        onChange={(e) => {
                          switchType(e, index1);
                        }}
                      />
                      <label className={s.answer} htmlFor={`radio${index1}`}>
                        Варианты
                      </label>
                    </div>
                    <div>
                      <input
                        className={s.inputradio}
                        type="radio"
                        id={`radio${index1}`}
                        name={`radio${index1}`}
                        value={"text"}
                        checked={formData[index1]?.type === "text"}
                        onChange={(e) => {
                          switchType(e, index1);
                        }}
                      />
                      <label className={s.answer} htmlFor={`radio${index1}`}>
                        Текст
                      </label>
                    </div>
                  </fieldset>
                  <div className={s.answers}>
                    {question?.type === "radio" && (
                      <div className={s.answerswrapper}>
                        {question?.options?.map((radio, index2) => (
                          <fieldset key={`${index1} ${index2}`}>
                            <div className={s.oneradiowrapper}>
                              <p className={s.optionnumber}>
                                Вариант {index2 + 1}
                              </p>
                              <input
                                type="text"
                                name="answer"
                                id={`${index1} : ${index2} radio`}
                                placeholder="Напишите:"
                                className={s.inputtext}
                                onChange={(e) =>
                                  changeAnswerVarient(e, index1, index2)
                                }
                              />
                              <div className={s.radio}>
                                <input
                                  className={s.inputradio}
                                  type="radio"
                                  readOnly={true}
                                />
                                <label htmlFor={`${index1} : ${index2} radio`}>
                                  {radio}
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        ))}
                        <button
                          className={`${s.submit} ${s.submit2}`}
                          onClick={(e) => addVarient(e, index1)}
                        >
                          Добавить вариант
                        </button>
                      </div>
                    )}
                    {question?.type === "text" && (
                      <>
                        <input
                          type="text"
                          readOnly={true}
                          className={s.inputtext}
                          placeholder={"Здесь будет ответ"}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}

              {isDataSended ? (
                <div className={s.buttonswrapper}>
                  <p className={s.congrat}>Тест был успешно создан!</p>
                  <button
                    className={`${s.submit} ${s.submit2}`}
                    onClick={rerunHandler}
                  >
                    Желаете создать новый?
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className={`${s.submit} ${s.addquestion}`}
                    onClick={addQuestionHandler}
                  >
                    Добавить вопрос
                  </button>
                  <button className={s.submit} onClick={handleSubmit}>
                    Создать Тест
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={s.rightbarWrapper}>
          <div className={s.rightbar}>
            <Testnav test={{ questions: formData }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCreation;
