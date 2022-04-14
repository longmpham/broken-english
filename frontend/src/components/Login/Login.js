import React from "react";

const Login = () => {

  const [formData, setFormData] = React.useState({
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" value={formData.email} placeholder="email" onChange={handleChange}></input>
          <input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange}></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
