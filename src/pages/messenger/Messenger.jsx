import React, { useContext, useEffect, useRef, useState } from "react";
import "./messenger.css";

import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import Sidebar from "../../components/sidebar/Sidebar";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { io } from "socket.io-client";

function Messenger() {
  const [conversations, setCoversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(UserContext);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get(`/conversations/${user?._id}`);
      setCoversations(res.data);
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(`/messages/${currentChat?._id}`);
          setMessages(res.data);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="messenger__chatMenu">
          <Sidebar />
        </div>
        <div className="messenger__chatBox">
          <div className="messenger__chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="messenger__chatBoxTop">
                  {messages?.map((message) => (
                    <div ref={scrollRef} key={message._id}>
                      <Message {...message} own={message.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="messenger__chatBoxBottom">
                  <textarea
                    placeholder="Напишите ваше сообщение"
                    className="messenger__chatInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    onKeyDown={(e) => {
                      e?.key === "Enter" && e?.shiftKey === false && handleSubmit(e);
                    }}
                  ></textarea>
                  <button
                    className="messenger__chatSubmit"
                    onClick={handleSubmit}
                  >
                    Отправить
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="messanger__noConversation">Выберите диалог</span>
            )}
          </div>
        </div>
        <div className="messenger__chatOnline">
          <div className="messenger__chatMenuWrapper">
            <input
              placeholder="Поиск друзей"
              className="messenger__chatMenuInput"
            />
            {conversations?.map((conversation) => (
              <div
                onClick={() => {
                  setCurrentChat(conversation);
                }}
                key={conversation._id}
              >
                <Conversations {...conversation} currenUser={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
