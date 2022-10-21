import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../../static/css/EditAccount.css";

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
                        <Navbar />
                        <div className="update-particulars-container">
                            <div>
                                {error_message == "NULL" && <p>&nbsp;</p>}
                                {error_message != "NULL" && (
                                    <p>{error_message}</p>
                                )}
                            </div>

                            <div className="update-form-container">
                                <div className="header">
                                    {" "}
                                    Update Particulars{" "}
                                </div>
                                <form onSubmit={this.updateUserData}>
                                    <div className="update-entry">
                                        <label className="entry-name">
                                            Username
                                        </label>
                                        <input
                                            className="entry-details"
                                            required
                                            placeholder="Username"
                                            type="text"
                                            name="username"
                                            id="username"
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="update-entry">
                                        <label className="entry-name">
                                            Password
                                        </label>
                                        <input
                                            className="entry-details"
                                            required
                                            placeholder="Passowrd"
                                            type="password"
                                            name="password"
                                            id="name"
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="button-list">
                                        <a
                                            className="form-revert-button"
                                            href={`/login`}
                                        >
                                            Go back
                                        </a>

                                        <button
                                            className="form-submit-button"
                                            type="submit"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
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
