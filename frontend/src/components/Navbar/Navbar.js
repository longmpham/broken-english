import React from "react";
import { Link } from "react-router-dom";

import { MdChat, MdMenu, MdCancel } from "react-icons/md";
import "./Navbar.scss";

const Navbar = () => {
  const pages = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Login",
      link: "/login",
    },
    {
      title: "Register",
      link: "/register",
    },
    {
      // title: "Conversations",
      title: "Conv",
      link: "/conversations",
    },
  ];

  const [menu, setMenu] = React.useState(false);

  const handleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/">
          {" "}
          <img
            className="navbar-logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmepiraddtMrJWnY_Sz7rKFYqHyCqx4fnqqA&usqp=CAU"
            alt="navbar-logo"
          />
        </Link>
      </div>
      <div className="navbar-middle">
        <Link to="/">
          <h1 className="btn-nav navbar-title">Broken English</h1>
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          {pages.map((page) => {
            return (
              <li key={page.title} >
                <Link className="btn-nav" to={page.link}>{page.title}</Link>
              </li>
            );
          })}
        </ul>
        <button className="navbar-menu" onClick={handleMenu}>
          {menu ? <MdCancel /> : <MdMenu />}
        </button>
      </div>
      {menu && (
        <div className="navbar-sidebar">
          <ul className="navbar-sidebar-links" onClick={handleMenu}>
            {pages.map((page) => {
              return (
                <li key={page.title}>
                  <Link to={page.link}>{page.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
