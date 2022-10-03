import React from "react";
import "../../static/css/Navbar.css";

function Navbar() {
    return (
        <>
            <div className="navbar-container">
                <div className="navbar-logo">FindR</div>
                <div className="navbar-content">
                    <ul className="navbar-content-links">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">About us</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-link">
                    <ul className="navbar-link-links">
                        <li>
                            <a className="login" href="/">
                                Login
                            </a>
                        </li>
                        <li>
                            <a className="signup" href="/">
                                Signup
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;
