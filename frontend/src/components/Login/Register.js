import React from "react";
import axios from "axios";
import Form from "../Components/Form";
import { ValidateMessage, handleValidate } from "../Validation/Validation";

import "./Login.scss";

const Register = () => {
  const [validateMessage, setValidateMessage] = React.useState({
    type: "",
    message: "",
  });
  const [form, setForm] = React.useState({
    username: "",
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

      const url = "http://localhost:9000/api/users/register";
      // call axios
      const response = await axios({
        method: "post",
        data: {
          username: form.username,
          email: form.email,
          password: form.password,
        },
        withCredentials: true,
        url: url,
      });
      console.log(response);
      if(response.status === 200) {
        // redirect to home page
        console.log("redirecting to home page")
      }
      else {
        console.log("Something went wrong with the server. Did not login.");
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
        <h1>Register</h1>
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

export default Register;
