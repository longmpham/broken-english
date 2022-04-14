import React from "react";

const Register = () => {

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Success")
    console.log(formData)
  }

  const handleChange = (event) => {
    setFormData(prevFormData => {
      return{
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={formData.username} placeholder="username" onChange={handleChange}></input>
          <input type="email" name="email" value={formData.email} placeholder="email" onChange={handleChange}></input>
          <input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange}></input>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
