import axios from 'axios';
import React from 'react'

import { myContext } from "../../Context";

const Profile = (props) => {
  const {userObject} = React.useContext(myContext);
  console.log(userObject)

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    weight: "",
    height: "",
    gender: "",
  })

  const handleChange = (event) => {
    console.log(event.target.value)
    setForm(prevForm => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form)
    // send form using axios
    
    try {
      const url = "http://localhost:9000/api/users/update";
      const options = {
        method: "post",
        url: url,
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          weight: form.weight,
          height: form.height,
          gender: form.gender,
        },
        withCredentials: true,
      }
      const response = await axios(options)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <p>PROFILE PAGE</p>
      {userObject && (
        <>
          <p>{userObject.user._id}</p>
          <p>{userObject.user.email}</p>
          <img src={userObject.user.photo} alt={userObject.user.photo} />
        </>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" className="" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange}></input>
        <input type="text" className="" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange}></input>
        <input type="text" className="" name="weight" placeholder="Weight" value={form.weight} onChange={handleChange}></input>
        <input type="text" className="" name="height" placeholder="Height" value={form.height} onChange={handleChange}></input>
        <input type="text" className="" name="gender" placeholder="Gender" value={form.gender} onChange={handleChange}></input>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Profile