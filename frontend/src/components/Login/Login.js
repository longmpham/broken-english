import React from "react";
// import ValidateMessage from "../Validation/Validation";
// import translate from "../Validation/Validation";
import { ValidateMessage, validate } from "../Validation/Validation";
// import { ValidateMessage, validate } from "../Validation/Validation"

import "./Login.scss";

const Login = () => {
  const [validateMessage, setValidateMessage] = React.useState({
    type: "",
    message: "",
  });
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate function
    let isValidated = handleValidate()

    if(isValidated) {
      console.log("Success");
      console.log(formData);
    } else {
      console.log('Did not login.')
    }
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleClose = () => {
    console.log('closing')
    setValidateMessage((prevValidateMessage) => {
      return {
        type: "",
        message: "",
      };
    });  
  }

  const handleValidate = () => {
    let isValidated = validate(formData);
    setValidateMessage((prevValidateMessage) => {
      return isValidated
    });
    setTimeout(() => {
      // clear the message after 3s
      setValidateMessage((prevValidateMessage) => {
        return {
          type: "",
          message: "",
        };
      });
    }, 5000);
    if (isValidated.type === "success") {
      return true
    }
    return false
  };

  return (
    <div className="login-container">
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
