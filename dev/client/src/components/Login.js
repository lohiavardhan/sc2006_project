import "../../static/css/LoginSignup.css";

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
          <div className="login-container">
            <div className="login-background">
              {error != "OK" && <p>{error}</p>}
              <div className="login-panel">
                <div className="login-content">
                  <h3 className="login-content-title">Login</h3>
                  <form onSubmit={this.handleSubmit}>
                    <div className="login-content-credential">
                      <img
                        src="./assets/icons/Username.png"
                        alt="icon"
                        className="login-content-credential-icon"
                      ></img>
                      <input
                        className="login-content-credential-input"
                        required
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="login-content-credential">
                      <img
                        src="./assets/icons/Password.png"
                        alt="icon"
                        className="login-content-credential-icon"
                      ></img>
                      <input
                        className="login-content-credential-input"
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="login-content-btn btn-positive"
                    >
                      Login
                    </button>
                  </form>
                  <a
                    href={`/forgetpassword`}
                    className="login-content-forgetpass"
                  >
                    Forget Password?
                  </a>
                  <div className="line"> </div>
                  <div className="login-content-signup">
                    <p className="login-content-signup-text">
                      Need an account?
                    </p>
                    <a href={`/signup`} className="login-content-signup-link">
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
