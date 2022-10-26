import "../../static/css/LoginSignup.css";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoggedOutNavbar from "./LoggedOutNavbar";
import { ClipLoader } from "react-spinners";

class ForgetPassEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error_message: "NULL",
      redirect: false,
      isLoading: false,
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
        email: this.state.email,
      }),
    };

    fetch("/api/v1/accounts/forgot", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error == "status_OK") {
          this.setState({ redirect: true, isLoading: false });
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
    const { error_message } = this.state;
    const { email } = this.state;
    const { isLoading } = this.state;

    if (!redirect) {
      return (
        <>
          <LoggedOutNavbar />
          <div className="otp-container">
            <div className="otp-background">
              {error_message != "NULL" && (
                <p className="otp-error">{error_message}</p>
              )}
              {error_message == "NULL" && <p className="otp-error">&nbsp;</p>}
              <div className="otp-panel">
                <div className="otp-content">
                  <h3 className="otp-content-title">Recovery Email</h3>
                  <p className="otp-content-instruction">
                    Enter your registered email address
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="otp-content-credential">
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        className="otp-input"
                        onChange={this.handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="otp-content-btn btn-positive"
                    >
                      {isLoading ? (
                        <ClipLoader color={"#ffffff"} />
                      ) : (
                        <p>Submit</p>
                      )}
                    </button>
                  </form>
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
      return <Navigate to={`/login/forgetpassword/authenticate/${email}`} />;
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

export default withParams(ForgetPassEmail);
