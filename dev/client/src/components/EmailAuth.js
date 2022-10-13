import "../../static/css/LoginSignup.css";

import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

class EmailAuth extends Component {
  constructor(props) {
    super(props);
    let { email } = this.props.params;
    this.state = {
      email: email,
      user: "",
      OTP: "",
      error: null,
      redirect: false,
      isAuth: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/accounts/signup/authenticate?email=" + this.state.email)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error == "error_not_auth") {
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

  handleSubmit(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        code: this.state.OTP,
      }),
    };

    fetch("/api/v1/accounts/signup/authenticate", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ error: json.error });
        if (this.state.error == "OK") {
          this.setState({ redirect: true, user: json.user });
        } else if (this.state.error == "error_invalidOTP") {
          this.setState({ error: "OTP is incorrect!!" });
        }
      });
  }

  render() {
    const { redirect } = this.state;
    const { user } = this.state;
    const { error } = this.state;
    const { isAuth } = this.state;

    if (isAuth) {
      if (!redirect) {
        return (
          <>
            <div className="otp-container">
              <div className="otp-background">
                {error != "OK" && <p className="otp-error">{error}</p>}
                <div className="otp-panel">
                  <div className="otp-content">
                    <h3 className="otp-content-title">Verification</h3>
                    <p className="otp-content-instruction">
                      Enter the OTP code that you received in your email.
                    </p>
                    <form onSubmit={this.handleSubmit}>
                      <div className="otp-content-credential">
                        <input
                          required
                          type="password"
                          name="OTP"
                          id="OTP"
                          placeholder="OTP"
                          className="otp-input"
                          onChange={this.handleChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="otp-content-btn btn-positive"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return <Navigate to={`/accounts/${user}`} />;
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
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default withParams(EmailAuth);
