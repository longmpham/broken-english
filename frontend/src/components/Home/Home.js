import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-landing-container">
        <h1>Welcome to Broken-English</h1>
        <p>Here, you can send a message and translate it to your partner!</p>
        <button><Link to="/login">Login</Link></button>
        <button><Link to="/login">Register</Link></button>
      </div>
    </div>
  );
};

export default Home;
