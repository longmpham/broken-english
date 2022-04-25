import React from "react";

// css from src/Styles/validation.scss
// todo: add transition for closing

// todo: add a validatorFunction
const validate = ({ username, email, password, message, room }) => {
  // todo: add extra validation towards regex like email must take on @email.com format
  // usernames must include xyz
  // passwords must contain lower, upper, number, symbol

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
    message: "Success!",
  };
};

const handleValidate = async (form) => {
  const validation = await validate(form);
  if (validation.type === "success") {
    return validation;
  }
  return validation;
};

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

export { ValidateMessage, handleValidate, validate };
// export default ValidateMessage;

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
