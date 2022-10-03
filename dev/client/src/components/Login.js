import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: null,
            redirect: false,
            isAuth: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("/api/v1/accounts/login")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "error_user_has_login") {
                    this.setState({
                        isAuth: true,
                        username: json.username,
                    });
                }
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        };

        fetch("/api/v1/accounts/login", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "OK") {
                    this.setState({ redirect: true });
                } else {
                    this.setState({
                        error: "Invalid Username and/or Password !!",
                    });
                }
            });
    }

    render() {
        const { redirect } = this.state;
        const { username } = this.state;
        const { error } = this.state;
        const { isAuth } = this.state;

        if (!redirect && !isAuth) {
            return (
                <>
                    <div>
                        <div>
                            <hr />
                        </div>
                        {error != "OK" && <p>{error}</p>}
                        <h3>Login to account</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>Username</label>
                                <input
                                    required
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div>
                                <label>Password</label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <hr />
                            <button type="submit">Login</button>
                        </form>

                        <a href={`/signup`}> Don't have an account? </a>
                    </div>
                </>
            );
        } else {
            return <Navigate to={`/accounts/${username}`} />;
        }
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}
