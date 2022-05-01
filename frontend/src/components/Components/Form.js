import React from "react";

import "../../Styles/variables.scss";

const Form = ({ form, handleChange, handleSubmit }) => {
  const formKeys = Object.keys(form);

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {formKeys.map((key) => {
        let type = key === "text" ? "text" : key
        return (
          <input key={key}
            type={type}
            name={type}
            value={form.key}
            placeholder={key}
            onChange={handleChange}
          ></input>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Form;
