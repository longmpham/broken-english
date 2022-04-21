import React from "react";
import { MdSend } from "react-icons/md";

import "./Conversation.scss";
import Translate from "./Translate";

// const Conversation = ({ socket, form: { username, room } }) => {
const Conversation = ({ socket, form: { username, room } }) => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const messagesEndRef = React.useRef(null);
  const [tolerance, setTolerance] = React.useState(0);

  const sendMessage = async () => {
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

    let validated = validateMessage();
    if (validated) {
      sendMessage();
      setMessage((prevMessage) => "");
    }
  };

  const validateMessage = () => {
    if (message === "") {
      console.log("Nothing was written");
      return false;
    }
    return true;
  };

  const getMessages = async (data) => {
    socket.on("broadcast_data", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  };

  React.useEffect(() => {
    getMessages();
  }, [socket]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTranslate = (translatedMessage) => {
    console.log(`translated message from child: ${translatedMessage}`);
    setMessage(translatedMessage);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleTolerance = (event) => {
    setTolerance(prevTolerance => event.target.value)
  }

  return (
    <div className="conversation-container">
      <div className="conversation-window">
        <div className="conversation-header">
          <h1>Live in Room: {room}</h1>
        </div>
        <div id="conversation-body" className="conversation-body">
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
            <div ref={messagesEndRef} />
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
              onKeyPress={handleKeyPress}
              autoComplete="off"
            ></input>
            <button type="submit" className="btn btn-icon">
              <MdSend />
            </button>
          </form>
          <div className="conversation-slider-container">
            <input
              className="conversation-tolerance-slider"
              type="range"
              min="0"
              // max={message.split(" ").length}
              max="10"
              value={tolerance}
              onChange={handleTolerance}
            ></input>
            <div className="tolerance-bubble">{tolerance}</div>
          </div>
          <Translate handleTranslate={handleTranslate} tolerance={tolerance}/>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
