import React from "react";
import { MdSend } from "react-icons/md"

import "./Conversation.scss";
import Translate from "./Translate";

// const Conversation = ({ socket, form: { username, room } }) => {
const Conversation = ({ socket, form: { username, room } }) => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const sendMessage = async () => {
    if (message === "") console.log("fields are empty. not able to join");

    const currentDate =
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
    const messageData = {
      room: room,
      author: username,
      message: message,
      time: currentDate,
    };

    console.log(messageData);
    await socket.emit("send_chat", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  const handleChange = (event) => {
    setMessage((prevMessage) => event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    sendMessage();
  };

  const getMessages = async (data) => {
    socket.on("broadcast_data", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  };

  React.useEffect(() => {
    getMessages();
  }, [socket]);

  const handleTranslate = (translatedMessage) => {
    console.log(`translated message from child: ${translatedMessage}`);
    setMessage(translatedMessage);
  };

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <h1>Live Conversation in Room: {room}</h1>
      </div>
      <div className="conversation-body">
        <ul className="conversation-messages">
          {messages.map((msg, index) => {
            return (
              <li key={index} id={username === msg.author ? "me" : "other"}>
                <div className="message-content">
                  <p>{msg.message}</p>
                </div>
                <div className="message-meta">
                  <p>{msg.author}</p>
                  <p>{msg.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="conversation-footer">
        {/* input */}

        <form onSubmit={handleSubmit} className="conversation-send-form">
          <input
            className="conversation-send"
            type="text"
            name="message"
            value={message}
            placeholder={`Say Hello, ${username}`}
            onChange={handleChange}
            autoComplete="off"
          ></input>
          <button type="submit"><MdSend /></button>
        </form>
        <Translate handleTranslate={handleTranslate} />
      </div>
    </div>
  );
};

export default Conversation;
