import React, { Component } from "react";
import "../../static/css/Navbar.css";

export default class LoggedOutNavbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <a href="/home" className="navbar__logo">
          <span>Find</span>
          <span>R</span>
        </a>

        <div className="navbar__logged-out">
          <a className="navbar__icons navbar__icons--logged-out" href="/about">
            <i className="fa-regular fa-circle-question"></i>
          </a>
          <a className="navbar__links--login" href="/login">
            <p>Login</p>
          </a>
          <a className="navbar__links--signup" href="/signup">
            <p>Sign up</p>
          </a>
        </div>
      </div>
    );
  }
}
