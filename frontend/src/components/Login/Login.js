import React from "react";
import { ValidateMessage, handleValidate } from "../Validation/Validation";

import "./Login.scss";

const Login = () => {
  const [validateMessage, setValidateMessage] = React.useState({
    type: "",
    message: "",
  });
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validation = await handleValidate(form);

    setValidateMessage((prevValidateMessage) => validation);
    clearValidationMessage();

    if (validation.type !== "success") {
      console.log("Did not login.");
    } else {
      console.log("Success");
      console.log(form);
    }
  };

  const handleChange = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleClose = () => {
    clearValidationMessage(0);
  };

  return (
    <>
      <div className="login-form-container">
        <h1>Login</h1>
        {validateMessage.type && (
          <ValidateMessage
          type={validateMessage.type}
          message={validateMessage.message}
          handleClose={handleClose}
          />
          )}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="email"
            value={form.email}
            placeholder="email"
            onChange={handleChange}
            ></input>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="password"
            onChange={handleChange}
            ></input>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
