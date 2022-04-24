import React from "react";
import ValidateMessage from "../Validation/Validation";

import "./Login.scss";

const Login = () => {
  const [validateMessage, setValidateMessage] = React.useState({
    type: "",
    message: "",
  })
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    

    console.log("Success");
    console.log(formData);
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleMessage = () => {

    setValidateMessage((prevValidateMessage) => {
      return {
        type: "error",
        message: "Username is empty. Not able to join",
      };
    });
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Login</h1>
        {validateMessage.type && (
          <ValidateMessage
            type={validateMessage.type}
            message={validateMessage.message}
            handleClose={handleMessage}
          />
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="password"
            onChange={handleChange}
          ></input>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
