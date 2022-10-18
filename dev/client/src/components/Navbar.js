import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "../../static/css/Navbar.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };
    }

    componentDidMount() {
        fetch("/api/v1/accounts/login")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "status_invalid_access") {
                    this.setState({
                        username: json.username,
                    });
                }
            });
    }

    render() {
        const { username } = this.state;
        return (
            <>
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
                            <div className="right-logged-in">
                                <a
                                    className="nav-item nav-link active nav-bar-auth-true"
                                    href={`/accounts/${username}`}
                                >
                                    <i className="fa-regular fa-user"></i>
                                </a>
                                <a
                                    className="nav-item nav-link nav-bar-auth-true"
                                    href={`/accounts/${username}/wishlist`}
                                >
                                    <i className="fa-regular fa-heart"></i>
                                </a>
                                <a
                                    className="nav-item nav-link nav-bar-auth-true"
                                    href={`/accounts/${username}/friends/view`}
                                >
                                    <i className="fa-solid fa-user-group"></i>
                                </a>
                                <a
                                    className="nav-item nav-link nav-bar-auth-true"
                                    href="/about"
                                >
                                    <i className="fa-regular fa-circle-question"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                {/*
                <form class="nav-search">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                     <button class="button-for-searching" type="submit">Search</button>
                </form>
                    */}
            </>
        );
    }
}

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

export default withParams(Navbar);
