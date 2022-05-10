import React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

import "./Login.scss";

const socialsButtons = [
  {
    name: "Google",
    color: "",
    icon: <FcGoogle />,
  },
  {
    name: "GitHub",
    color: "6e5494",
    icon: <FaGithub />,
  },
  {
    name: "Facebook",
    color: "",
    icon: <FaFacebook />,
  },
];

const SocialLogin = () => {


  const handleClick = (prop) => {
    console.log(prop); // gives back Social names, so now we can handle all socials in one go.
    window.open(`http://localhost:9000/api/users/auth/${prop.toLowerCase()}`, "_self")
  };

  return (
    <>
      <div className="login-form-socials-container">
        {/* <h1>Login With Socials</h1> */}
        {socialsButtons.map((social) => {
          return (
            <div
              key={social.name}
              className={`btn btn-primary login-social-${social.name.toLowerCase()}-container`}
              onClick={() => handleClick(social.name)}
            >
              {social.icon}
              <p>Login with {social.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SocialLogin;
