import React from "react";
import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
// import { MdCancel } from "react-icons/md";

import Conversation from "./Conversation";

import "./Chat.scss";
import { ValidateMessage, handleValidate } from "../Validation/Validation";

// const url = "http://localhost:9000";
// const socket = io.connect(url);

const Chat = () => {
  const url = "http://localhost:9000";
  const [form, setForm] = React.useState({
    username: "",
    room: "",
  });
  const [validateMessage, setValidateMessage] = React.useState([
    {
      type: "",
      message: "",
    },
  ]);
  const [socket, setSocket] = React.useState();
  const [showChat, setShowChat] = React.useState(false);
  // let navigate = useNavigate();

  React.useEffect(() => {
    const socket = io.connect(url);
    setSocket((prevSocket) => socket);

    // required to clean up memory leaks! Close if socket dismounts
    return () => {
      socket.disconnect();
    };
  // }, [setSocket]);
  }, []);

  const clearValidationMessage = (timer = 5000) => {
    setTimeout(() => {
      setValidateMessage((prevValidateMessage) => {
        return {
          type: "",
          message: "",
        };
      });
    }, timer);
  };

  const joinRoom = () => {
    // todo: figure out how to send socket -> useContext?
    // const options = {
    //   state: {
    //     socket,
    //     form,
    //   },
    // };
    // console.log(options);
    // setSocket((prevSocket) => io.connect(url));
    // socket.emit("join_room", form.room);
    // const socket = io.connect(url);
    // https://stackoverflow.com/questions/71755580/cant-send-socket-with-usenavigate-hook
    // navigate("/conversation",{state:{id:1,socket:socket,form:form}});
    // navigate('/conversation',{state:{id:1,name:'sabaoon'}});

    socket.emit("join_room", form.room);
    setValidateMessage((prevValidateMessage) => {
      return {
        type: "success",
        message: `Hey ${form.username}! You've successfully joined room ${form.room}`,
      };
    });
    clearValidationMessage();
    setShowChat((prevShowChat) => !prevShowChat);
  };

  const handleChange = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValidated = await handleValidate(form);

    setValidateMessage((prevValidateMessage) => isValidated);
    clearValidationMessage();

    if (isValidated.type !== "success") {
      console.log("Did not login.");
    } else {
      console.log("Success");
      console.log(form);
      joinRoom();
    }
  };

  const handleClose = () => {
    clearValidationMessage(0);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-landing-container">
        <h1>Join A Room</h1>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="username..."
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          ></input>
          <input
            type="text"
            name="room"
            value={form.room}
            placeholder="room id..."
            onChange={handleChange}
            // onKeyPress={handleKeyPress}
          ></input>
          <button type="submit" className="btn btn-icon btn-send">
            Join
          </button>
        </form>
        {validateMessage.type && (
          <ValidateMessage
            type={validateMessage.type}
            message={validateMessage.message}
            handleClose={handleClose}
          />
        )}
      </div>
      {showChat && <Conversation socket={socket} form={form} />}
    </div>
  );
};

export default Chat;
