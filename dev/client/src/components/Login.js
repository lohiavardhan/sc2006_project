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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    fetch("/api/login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ error: json.error }, () => {
          if (this.state.error == "OK") {
            this.setState({ redirect: true });
          }
        });
      });
  }

  render() {
    const { redirect } = this.state;
    const { username } = this.state;
    if (!redirect) {
      return (
        <>
          <div>
            <div>
              <hr />
            </div>
            {this.state.error != null && <p>{this.state.error}</p>}
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
          </div>
        </>
      );
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
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
