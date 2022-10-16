import React, { Component } from "react";
import "../../static/css/Navbar.css";

export default class Navbar extends Component {
    render() {
        return (
            <>
                <div className="navbar-container">
                    <a href="/home" className="navbar-logo">
                        findr
                    </a>
                    <ul className="navbar-links">
                        <li className="navbar-links-help">
                            <a href="/help" className="navbar-links-help-icon">
                                <img src="./assets/icons/Help.png" alt="Help" />
                            </a>
                        </li>
                        <li className="navbar-links-login">
                            <a href="/login">Login</a>
                        </li>
                        <li className="navbar-links-signup">
                            <a href="/signup">Sign up</a>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}
