import React from "react";
import io from "socket.io-client";
import Conversation from "./Conversation";

import "./Chat.scss"

// global socket so that react doesnt refresh it (for now? => useEffect?)
const url = "http://localhost:9000";
const socket = io.connect(url);

const Chat = () => {
  // socket connection

  const [form, setForm] = React.useState({
    username: "",
    room: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const joinRoom = () => {
    socket.emit("join_room", form.room);
  };

  const handleChange = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const validateRoom = () => {
    if (form.username === ""){
      console.log("Username is empty. Not able to join");
      setErrorMessage(prevErrorMessage => "Username is empty. Not able to join")
      setTimeout(() => {
        // clear the message after 3s
        setErrorMessage(prevErrorMessage => "")
      }, 3000)
      return false
    }
    
    if (form.room === ""){
      console.log("Room is empty. Not able to join");
      setErrorMessage(prevErrorMessage => "Room is empty. Not able to join")
      setTimeout(() => {
        // clear the message after 3s
        setErrorMessage(prevErrorMessage => "")
      }, 3000)
      return false
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validated = validateRoom();

    if (validated) {
      console.log(form);
      console.log("joining chat room");
  
      // join the room
      joinRoom();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-landing-container">
        <h1>Join A Room</h1>
        {errorMessage && <span className="error">{errorMessage}</span>}
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="username..."
            onChange={handleChange}
            ></input>
          <input
            type="text"
            name="room"
            value={form.room}
            placeholder="room id..."
            onChange={handleChange}
            ></input>
          <button type="submit" className="btn-send">Join</button>
        </form>
      </div>
      <Conversation socket={socket} form={form} />
    </div>
  );
};

export default Chat;
