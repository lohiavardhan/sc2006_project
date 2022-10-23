import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../../static/css/Account.css";
import AccountSideBar from "./AccountSideBar";

class EditAccount extends Component {
  constructor(props) {
    super(props);
    let { username } = this.props.params;
    this.state = {
      props_username: username,
      username: "",
      email: "",
      name: "",
      birthday: "",
      error_message: "NULL",
      redirect: false,
      isAuth: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/accounts/edit?username=" + this.state.props_username)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error == "status_invalid_access") {
          this.setState({
            isAuth: false,
          });
        } else {
          this.setState({
            username: json.username,
            name: json.name,
            email: json.email,
            birthday: json.birthday,
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
        email: this.state.email,
        name: this.state.name,
        birthday: this.state.birthday,
      }),
    };

    fetch("/api/v1/accounts/edit", requestOptions)
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
    const { name } = this.state;
    const { email } = this.state;
    const { birthday } = this.state;
    const { error_message } = this.state;
    const { isAuth } = this.state;

    if (isAuth) {
      if (!redirect) {
        return (
          <>
            <Navbar />
            <div className="acc-container">
              <AccountSideBar tab={"Account"} />

              <div className="acc-content">
                <h1 className="title acc-content__title">Update Particulars</h1>
                <div>
                  {error_message == "NULL" && <p>&nbsp;</p>}
                  {error_message != "NULL" && <p>{error_message}</p>}
                </div>
                <form
                  className="acc-content__editAcc"
                  onSubmit={this.updateUserData}
                >
                  <div className="acc-content__editAcc__editCred">
                    <label>Username</label>
                    <input
                      required={username == null}
                      placeholder={username}
                      type="text"
                      name="username"
                      id="username"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="acc-content__editAcc__editCred">
                    <label>Email</label>
                    <input
                      required={email == null}
                      placeholder={email}
                      type="email"
                      name="email"
                      id="email"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="acc-content__editAcc__editCred">
                    <label>Name</label>
                    <input
                      required={name == null}
                      placeholder={name}
                      type="text"
                      name="name"
                      id="name"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="acc-content__editAcc__editCred">
                    <label>Birthday</label>
                    <input
                      required={birthday == null}
                      placeholder={birthday}
                      type="date"
                      name="birthday"
                      id="birthday"
                      onChange={this.handleChange}
                      className="acc-content__editAcc__editCred__birthday"
                    />
                  </div>
                  <div className="acc-content__editAcc__buttons ">
                    <a
                      className="btn btn-negative acc-content__editAcc__back"
                      href={`/accounts/${username}`}
                    >
                      <p>Back</p>
                    </a>

                    <div className="acc-content__editAcc__update">
                      <button type="submit" className="btn btn-positive ">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        );
      } else {
        return <Navigate to={`/accounts/${username}`} />;
      }
    } else {
      return <Navigate to={`/home`} />;
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

export default withParams(EditAccount);
