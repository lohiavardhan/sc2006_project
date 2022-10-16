import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "../../static/css/Navbar.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            redirect: false,
            isAuth: false,
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
                        isAuth: true,
                        username: json.username,
                    });
                }
            });
    }

    render() {
        const { isAuth } = this.state;
        const { username } = this.state;
        return (
            <>
                <div className="navbar-container">
                    <a href="/home" className="navbar-logo">
                        findr
                    </a>

                    {!isAuth && (
                        <ul className="navbar-links">
                            <li className="navbar-links-help">
                                <a
                                    href="/help"
                                    className="navbar-links-help-icon"
                                >
                                    <img
                                        src="./assets/icons/Help.png"
                                        alt="Help"
                                    />
                                </a>
                            </li>

                            <li className="navbar-links-login">
                                <a href="/login">Login</a>
                            </li>
                            <li className="navbar-links-signup">
                                <a href="/signup">Sign up</a>
                            </li>
                        </ul>
                    )}
                    {isAuth && (
                        <ul>
                            <li>
                                <a
                                    href={`/accounts/${username}`}
                                    className="navbar-links-help-icon"
                                >
                                    <img
                                        src="./assets/icons/Help.png"
                                        alt="Accounts"
                                    />
                                </a>
                            </li>

                            <li>
                                <a href={`/accounts/${username}/wishlist`}>
                                    <img
                                        src="./assets/icons/Help.png"
                                        alt="WishList"
                                    />
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
            </>
        );
    }
}

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

export default withParams(Navbar);
