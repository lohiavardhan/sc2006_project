import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoggedOutNavbar from "./Navbar";
import "../../static/css/LoginSignup.css";

class UpdateCredentials extends Component {
    constructor(props) {
        super(props);
        let { email } = this.props.params;
        this.state = {
            username: "",
            email: email,
            password: "",
            error_message: "NULL",
            redirect: false,
            isAuth: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
    }

    componentDidMount() {
        const { email } = this.state;
        fetch("/api/v1/accounts/forgot/update?email=" + email)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "status_invalid_access") {
                    this.setState({
                        isAuth: false,
                    });
                }
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    updateUserData(e) {
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

        fetch("/api/v1/accounts/forgot/update", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "status_OK") {
                    this.setState({
                        redirect: true,
                    });
                } else {
                    this.setState({
                        error_message: json.error_message,
                    });
                }
            });
    }

    render() {
        const { redirect } = this.state;
        const { username } = this.state;
        const { password } = this.state;
        const { email } = this.state;
        const { error_message } = this.state;
        const { isAuth } = this.state;
        console.log(error_message);
        if (isAuth) {
            if (!redirect) {
                return (
                    <>
                        <LoggedOutNavbar />
                        <div className="login-container">
                            <div className="login-background">
                                {error_message != "NULL" && (
                                    <p className="login-error">
                                        {error_message}
                                    </p>
                                )}

                                <div className="login-panel">
                                    <div className="login-content">
                                        <h3 className="login-content-title">
                                            Update Particulars
                                        </h3>
                                        <form onSubmit={this.updateUserData}>
                                            <div className="login-content-credential">
                                                <i class="fa-regular fa-user"></i>
                                                <input
                                                    className="login-content-credential-input"
                                                    required
                                                    placeholder="Username"
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="login-content-credential">
                                                <i class="fa-solid fa-lock"></i>
                                                <input
                                                    className="login-content-credential-input"
                                                    required
                                                    placeholder="Passowrd"
                                                    type="password"
                                                    name="password"
                                                    id="name"
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="login-content-btn btn-positive"
                                            >
                                                Update
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            } else {
                return <Navigate to={`/login`} />;
            }
        } else {
            return <Navigate to={`/login`} />;
        }
    }
}

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
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

export default withParams(UpdateCredentials);
