import React from "react";
import { Link } from "react-router-dom"

import "./Home.scss"

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-landing-container">
        <h1>Welcome to Broken-English</h1>
        <p>Here, you can send a message and translate it to your partner!</p>
        {/* <button className="btn"><Link to="/login">Login</Link></button> */}
        <Link to="/login"><button className="btn btn-primary">Login</button></Link>
        <Link to="/register"><button className="btn">Register</button></Link>
      </div>
    </div>
  );
};

export default Home;