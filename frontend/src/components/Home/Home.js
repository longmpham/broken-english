import React from "react";
import { Link } from "react-router-dom"

import "./Home.scss"

const Home = () => {
  return (
    <>
      <div className="home-container">
        <h1>Welcome to Broken-English</h1>
        <p>Ever wanted to send a Google Translated message to someone? This is the app to do just that.</p>
        <div className="home-button-container">
          <Link to="/login"><button className="btn-primary">Login</button></Link>
          <Link to="/register"><button className="btn-secondary">Register</button></Link>
          <Link to="/chat"><button className="btn-primary">Try It!</button></Link>
        </div>
      </div>
    </>
  );
};

export default Home;