import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar-container">
      <button><Link to="/">HOME/Logo</Link></button>
      <h1>Broken English</h1>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/conversations">Conversations</Link></li>
        <li>Hamburger Icon</li>
      </ul>
    </div>
  )
}

export default Navbar