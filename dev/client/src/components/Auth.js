import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

class Auth extends Component {
  constructor(props) {
    super(props);
    let { email } = this.props.params;
    this.email = email;
    this.state = {
      OTP: "",
      error: null,
      redirect: false,
      user: "",
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
        last_code: this.state.OTP,
      }),
    };

    fetch("/api/authenticate", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ error: json.error });
        if (this.state.error == "OK") {
          this.setState({ redirect: true, user: json.user });
        }
      });
  }

  render() {
    const { redirect } = this.state;
    const { user } = this.state;
    console.log(user);
    if (!redirect) {
      return (
        <>
          <div>
            <div>
              <hr />
            </div>
            {this.state.error != null && <p>{this.state.error}</p>}
            <h3>Input OTP</h3>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>OTP </label>
                <input
                  required
                  type="password"
                  name="OTP"
                  id="OTP"
                  onChange={this.handleChange}
                />
              </div>
              <hr />
              <button type="submit">Create an account</button>
            </form>
          </div>
        </>
      );
    } else {
      return <Navigate to={`/account/${user}`} />;
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
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default withParams(Auth);
