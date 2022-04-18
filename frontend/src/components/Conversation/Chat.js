import React from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import Conversation from "./Conversation";

import "./Chat.scss";

const Chat = () => {
  // socket connection
  let socket;
  const [form, setForm] = React.useState({
    username: "",
    room: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  let navigate = useNavigate();

  const handleChange = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const joinRoom = () => {
    // const options = {
    //   state: {
    //     socket,
    //     form,
    //   },
    // };
    // console.log(options);
    const url = "http://localhost:9000";
    socket = io.connect(url);
    socket.emit("join_room", form.room);
    // https://stackoverflow.com/questions/71755580/cant-send-socket-with-usenavigate-hook
    // navigate("/conversation",{state:{id:1,socket:socket,form:form}});
    // navigate('/conversation',{state:{id:1,name:'sabaoon'}});
  };

  const validateRoom = () => {
    if (form.username === "") {
      console.log("Username is empty. Not able to join");
      setErrorMessage(
        (prevErrorMessage) => "Username is empty. Not able to join"
      );
      setTimeout(() => {
        // clear the message after 3s
        setErrorMessage((prevErrorMessage) => "");
      }, 3000);
      return false;
    }

    if (form.room === "") {
      console.log("Room is empty. Not able to join");
      setErrorMessage((prevErrorMessage) => "Room is empty. Not able to join");
      setTimeout(() => {
        // clear the message after 3s
        setErrorMessage((prevErrorMessage) => "");
      }, 3000);
      return false;
    }
    return true;
  };

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
          <button type="submit" className="btn-send">
            Join
          </button>
        </form>
      </div>
      {socket && <Conversation socket={socket} form={form} />}
    </div>
  );
};

export default Chat;
