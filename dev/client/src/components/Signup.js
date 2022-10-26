import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../../static/css/LoginSignup.css";
import LoggedOutNavbar from "./LoggedOutNavbar";
import { ClipLoader } from "react-spinners";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      error_message: "NULL",
      redirect: false,
      isAuth: false,
      isLoading: false,
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
        if (json.error == "status_invalid_access") {
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
    this.setState({
      isLoading: true,
    });
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
        console.log(json.error_message);
        if (json.error == "status_OK") {
          this.setState({
            redirect: true,
            isLoading: false,
          });
        } else {
          this.setState({
            error_message: json.error_message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const { redirect } = this.state;
    const { email } = this.state;
    const { error_message } = this.state;
    const { username } = this.state;
    const { isLoading } = this.state;
    const { isAuth } = this.state;

    if (!isAuth) {
      if (!redirect) {
        return (
          <>
            <LoggedOutNavbar />
            <div className="login-container">
              <div className="login-background">
                {error_message == "NULL" && (
                  <div>
                    <p className="login-error">&nbsp;</p>
                  </div>
                )}
                {error_message != "NULL" && !isLoading && (
                  <p className="signup-error">{error_message}</p>
                )}
                <div className="login-panel">
                  <div className="login-content">
                    <h3 className="login-content-title">Sign Up</h3>
                    <form onSubmit={this.handleSubmit}>
                      <div className="login-content-credential">
                        <i class="fa-solid fa-envelope"></i>
                        <input
                          required
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          className="login-content-credential-input"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="login-content-credential">
                        <i class="fa-regular fa-user"></i>
                        <input
                          required
                          type="text"
                          name="username"
                          id="username"
                          placeholder="Username"
                          className="login-content-credential-input"
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="login-content-credential">
                        <i class="fa-solid fa-lock"></i>
                        <input
                          required
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          className="login-content-credential-input"
                          onChange={this.handleChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="login-content-btn btn-positive"
                      >
                        {isLoading ? (
                          <ClipLoader color={"#ffffff"} />
                        ) : (
                          <p>Sign up</p>
                        )}
                      </button>
                    </form>
                    <div className="login-content-signup">
                      <p className="login-content-signup-text">
                        Already have an account?
                      </p>
                      <a href={`/login`} className="login-content-signup-link">
                        Login
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return <Navigate to={`authenticate/${email}`} />;
      }
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
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
