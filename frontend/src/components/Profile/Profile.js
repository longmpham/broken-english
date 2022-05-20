import axios from "axios";
import React from "react";

import { myContext } from "../../Context";
import { handleValidate, ValidateMessage } from "../Validation/Validation";

const Profile = (props) => {
  const { userObject, getUser } = React.useContext(myContext);
  const [validateMessage, setValidateMessage] = React.useState({
    type: "",
    message: "",
  });

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    weight: "",
    height: "",
    gender: "",
  });

  React.useEffect(() => {
    const updateForm = () => {
      setForm((prevForm) => {
        return {
          firstName: userObject ? userObject.user.user.firstName : "",
          lastName: userObject ? userObject.user.user.lastName : "",
          weight: userObject ? userObject.user.user.weight : "",
          height: userObject ? userObject.user.user.height : "",
          gender: userObject ? userObject.user.user.gender : "",
        };
      });
    };
    updateForm();
    console.log("user form updated with userobject info");
    console.log(userObject);
  }, [userObject]);

  const [updateUser, setUpdateUser] = React.useState(false);

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

  const handleChange = (event) => {
    // console.log(event.target.value);
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userObject) {
      return;
    }

    let validation = await handleValidate(form);

    setValidateMessage((prevValidateMessage) => validation);
    clearValidationMessage();

    if (validation.type !== "success") {
      console.log("Did not login.");
    } else {
      // send form using axios
      // console.log(userObject)
      // console.log(form)
      try {
        const url = "http://localhost:9000/api/users/update";
        const options = {
          method: "post",
          url: url,
          data: {
            id: userObject.user._id,
            firstName: form.firstName,
            lastName: form.lastName,
            weight: form.weight,
            height: form.height,
            gender: form.gender,
          },
          withCredentials: true,
        };
        const response = await axios(options);
        console.log(response);
        // if(!response.data.success) {
        //   console.log('response.data.message')
        //   // return window.location.href="/login";
        // }

        if (!response.data.success) {
          console.log('something bad happened')
          return 
        } else {
          // call the updated context object
          getUser();
          setUpdateUser((prevUpdateUser) => false);

        }
        
      } catch (error) {
        console.log(error);
        setValidateMessage((prevValidateMessage) => {
          return {
            type: "error",
            message: error.response.data,
          };
        });
        clearValidationMessage();
        if(!error.response.data.success) {
          console.log('response.data.message')
          setTimeout(() => {

            window.location.href="/login";
          },5000)
        }
      }
    }
  };
  const handleClose = () => {
    clearValidationMessage(0);
  };

  const handleUpdate = () => {
    setUpdateUser((prevUpdateUser) => !prevUpdateUser);
  };

  return (
    <>
      <p>PROFILE PAGE</p>
      {userObject && (
        <>
          <p>{userObject.user._id}</p>
          <p>{userObject.user.email}</p>
          <img src={userObject.user.photo} alt={userObject.user.photo} />
          <h2>{userObject.user.username}'s Profile Information</h2>
          {validateMessage.type && (
            <ValidateMessage
              type={validateMessage.type}
              message={validateMessage.message}
              handleClose={handleClose}
            />
          )}
          {userObject.user.user ? (
            !updateUser ? (
              <>
                {/* todo: turn this to map-> profile info */}
                <div>
                  <span>First Name: </span>
                  <span>{userObject.user.user.firstName}</span>
                </div>
                <div>
                  <span>Last Name: </span>
                  <span>{userObject.user.user.lastName}</span>
                </div>
                <div>
                  <span>Weight: </span>
                  <span>{userObject.user.user.weight}</span>
                </div>
                <div>
                  <span>Height: </span>
                  <span>{userObject.user.user.height}</span>
                </div>
                <div>
                  <span>Gender: </span>
                  <span>{userObject.user.user.gender}</span>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <label>First Name: </label>
                  <input
                    type="text"
                    className=""
                    name="firstName"
                    placeholder={userObject.user.user.firstName}
                    value={form.firstName}
                    onChange={handleChange}
                  ></input>
                  <label>Last Name: </label>
                  <input
                    type="text"
                    className=""
                    name="lastName"
                    placeholder={userObject.user.user.lastName}
                    value={form.lastName}
                    onChange={handleChange}
                  ></input>
                  <label>Weight: </label>
                  <input
                    type="text"
                    className=""
                    name="weight"
                    placeholder={userObject.user.user.height}
                    value={form.weight}
                    onChange={handleChange}
                  ></input>
                  <label>Height: </label>
                  <input
                    type="text"
                    className=""
                    name="height"
                    placeholder={userObject.user.user.height}
                    value={form.height}
                    onChange={handleChange}
                  ></input>
                  <label>Gender: </label>
                  <input
                    type="text"
                    className=""
                    name="gender"
                    placeholder={userObject.user.user.gender}
                    value={form.gender}
                    onChange={handleChange}
                  ></input>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </>
            )
          ) : (
            <>
              {/* FIRST TIME THE USER LOGS IN, MUST SET INFO */}
              <h2>Please enter your profile details before we continue.</h2>
              <form onSubmit={handleSubmit}>
                {/* todo: validate input frontend-side. backend already throws empty error */}
                <label>First Name</label>
                <input
                  type="text"
                  className=""
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                ></input>
                <label>Last Name</label>
                <input
                  type="text"
                  className=""
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                ></input>
                <label>Weight</label>
                <input
                  type="text"
                  className=""
                  name="weight"
                  placeholder="Weight"
                  value={form.weight}
                  onChange={handleChange}
                ></input>
                <label>Height</label>
                <input
                  type="text"
                  className=""
                  name="height"
                  placeholder="Height"
                  value={form.height}
                  onChange={handleChange}
                ></input>
                <label>Gender</label>
                <input
                  type="text"
                  className=""
                  name="gender"
                  placeholder="Gender"
                  value={form.gender}
                  onChange={handleChange}
                ></input>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </>
          )}
        </>
      )}
      {(userObject && !updateUser) ? (
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleUpdate}>
          Cancel
        </button>
      )}
    </>
  );
};

export default Profile;
