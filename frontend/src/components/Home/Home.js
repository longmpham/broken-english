import React from "react";
import { Link } from "react-router-dom"

import "./Home.scss"

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-landing-container">
        <h1>Welcome to Broken-English</h1>
        <p>Ever wanted to send a send a Google Translated message to someone? This is the app to do just that.</p>
        {/* <button className="btn"><Link to="/login">Login</Link></button> */}
        <div className="home-landing-button-container">
          <Link to="/login"><button className="btn-primary">Login</button></Link>
          <Link to="/register"><button className="btn-primary">Register</button></Link>
          <Link to="/translate"><button className="btn-primary">Translate</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;