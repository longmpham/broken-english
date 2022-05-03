import React from "react";
import axios from "axios";
import Form from "../Components/Form";
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

  const clearValidationMessage = (timer = 59000) => {
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

      try {
        const url = "http://localhost:9000/api/users/login";
        // call axios
        const options = {
          method: "post",
          url: url,
          data: {
            email: form.email,
            password: form.password,
          },
          withCredentials: true,
        }
        const response = await axios(options)
        console.log(response);
        if(response.status === 201) {
          // redirect to home page
          console.log("redirecting to home page")
        }
      } catch (error) {
        console.log(error.response.data)
        // console.log("Something went wrong with the server. Did not login.");
        setValidateMessage((prevValidateMessage) => {
          return ({
            type: "error", 
            message: error.response.data
          })
        });
        clearValidationMessage();
      }
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
        <Form
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Login;

// CODE SNIPPET FOR FORM
/* <form onSubmit={handleSubmit} className="login-form">
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
</form> */
