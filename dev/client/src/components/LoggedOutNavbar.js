import React, { Component } from "react";
import "../../static/css/Navbar.css";

export default class LoggedOutNavbar extends Component {
    render() {
        return (
            <nav className="navbar justify-content-between">
                <div className="navbar-container">
                    <a href="/home" className="navbar-logo">
                        <span className="h1 text-uppercase text-dark bg-light px-2 logo-class-1">
                            Find
                        </span>
                        <span className="h1 text-uppercase text-light px-2 ml-n1 logo-class-2">
                            R
                        </span>
                    </a>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavAltMarkup"
                    >
                        <div className="right">
                            <a
                                className="navbar-links-help nav-item nav-link"
                                href="/help"
                            >
                                Help
                            </a>
                            <a
                                className="navbar-links-login nav-item nav-link"
                                href="/login"
                            >
                                Login
                            </a>
                            <a
                                className="navbar-links-signup nav-item nav-link"
                                href="/signup"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
