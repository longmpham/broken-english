import React from "react";

// css from src/Styles/validation.scss
// todo: add transition for closing

// todo: add a validatorFunction

const ValidateMessage = ({ type, message, handleClose }) => {
  return (
    <>
      {type === "info" ? (
        <div className="info" onClick={handleClose}>
          <p>{message}</p>
          <button className="btn-info">&times;</button>
        </div>
      ) : type === "success" ? (
        <div className="success" onClick={handleClose}>
          <p>{message}</p>
          <button className="btn-success">&times;</button>
        </div>
      ) : (
        // error (regardless of what happens (typos, etc.)!
        <div className="error" onClick={handleClose}>
          <p>{message}</p>
          <button className="btn-error">&times;</button>
        </div>
      )}
    </>
  );
};

const validate = ({ username, password, email, message, room }) => {
  if (username === "") {
    return {
      type: "error",
      message: "Username is empty",
    };
  }
  if (email === "") {
    return {
      type: "error",
      message: "Email is empty",
    };
  }
  if (password === "") {
    return {
      type: "error",
      message: "Password is empty",
    };
  }
  if (message === "") {
    return {
      type: "error",
      message: "Message is empty",
    };
  }
  if (room === "") {
    return {
      type: "error",
      message: "Room is empty",
    };
  }
  return {
    type: "success",
    message: "Success!"
  }
};

// const Error = ({ message, handleClose }) => {
//   return (
//     <div className="error" onClick={handleClose}>
//       <p>{message}</p>
//       <button className="btn-error">&times;</button>
//     </div>
//   );
// };

// const Success = ({ message, handleClose }) => {
//   return (
//     <div className="success" onClick={handleClose}>
//       <p>{message}</p>
//       <button className="btn-success">&times;</button>
//     </div>
//   );
// };

// const Info = ({ message, handleClose }) => {
//   return (
//     <div className="info" onClick={handleClose}>
//       <p>{message}</p>
//       <button className="btn-info">&times;</button>
//     </div>
//   );
// };

export { ValidateMessage, validate };
// export default ValidateMessage;
