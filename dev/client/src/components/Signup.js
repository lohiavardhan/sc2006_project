import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
        fetch("api/v1/accounts/signup")
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
                email: this.state.email,
                password: this.state.password,
            }),
        };

        fetch("/api/v1/accounts/signup", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({ error: json.error }, () => {
                    if (this.state.error == "OK") {
                        this.setState({ redirect: true });
                    } else if (this.state.error == "error_user_taken") {
                        this.setState({ error: "Username has been taken !!" });
                    } else if (this.state.error == "error_user_invalid") {
                        this.setState({ error: "Username is invalid !!" });
                    } else if (this.state.error == "error_email_taken") {
                        this.setState({
                            error: "Email has been registered !!",
                        });
                    } else if (this.state.error == "error_email_invalid") {
                        this.setState({ error: "Email is invalid !!" });
                    } else if (this.state.error == "error_password_invalid") {
                        this.setState({
                            error: "Password does not meet requirements !!",
                        });
                    }
                });
            });
    }

    render() {
        const { redirect } = this.state;
        const { email } = this.state;
        const { error } = this.state;
        const { username } = this.state;
        const { isAuth } = this.state;

        if (!isAuth) {
            if (!redirect) {
                return (
                    <>
                        <div>
                            <div>
                                <hr />
                            </div>
                            {error != "OK" && <p>{error}</p>}
                            <h3>Create an Account</h3>
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
                                    <label>Email</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        id="email"
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
                                <button type="submit">Create an account</button>
                            </form>
                            <a href={`/login`}> Already have an account? </a>
                        </div>
                    </>
                );
            } else {
                return <Navigate to={`authenticate/${email}`} />;
            }
        } else {
            return <Navigate to={`/account/${username}`} />;
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
