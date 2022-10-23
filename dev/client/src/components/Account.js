import "../../static/css/Account.css";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import AccountSideBar from "./AccountSideBar";

class Account extends Component {
  constructor(props) {
    super(props);
    let { username } = this.props.params;
    this.state = {
      prop_username: username,
      username: "",
      email: "",
      name: "",
      birthday: "",
      error_message: "NULL",
      redirect: false,
      isAuth: true,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/accounts?username=" + this.state.prop_username)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error == "status_OK") {
          this.setState({
            username: json.username,
            email: json.email,
            name: json.name,
            birthday: json.birthday,
          });
        } else {
          this.setState({
            isAuth: false,
          });
        }
      });
  }

  logout() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };

    fetch("/api/v1/accounts/logout", requestOptions).then(() => {
      this.setState({
        redirect: true,
      });
    });
  }

  render() {
    const { name } = this.state;
    const { email } = this.state;
    const { username } = this.state;
    const { birthday } = this.state;
    const { redirect } = this.state;
    const { isAuth } = this.state;

    if (isAuth) {
      if (!redirect) {
        return (
          <>
            <Navbar />
            <div className="acc-container">
              <AccountSideBar key={username} tab={"Account"} />
              <div className="acc-content">
                <h1 className="title acc-content__title">My Account</h1>
                <div className="acc-content__cred">
                  <i class="fa-solid fa-signature"></i>
                  <p className="acc-content__cred__label">Name</p>
                  <p className="acc-content__cred__detail">{name}</p>
                </div>

                <div className="acc-content__cred">
                  <i class="fa-regular fa-user"></i>
                  <p className="acc-content__cred__label">Username</p>
                  <p className="acc-content__cred__detail">{username}</p>
                </div>

                <div className="acc-content__cred">
                  <i class="fa-regular fa-envelope"></i>
                  <p className="acc-content__cred__label">Email</p>
                  <p className="acc-content__cred__detail">{email}</p>
                </div>

                <div className="acc-content__cred">
                  <i class="fa-solid fa-cake-candles"></i>
                  <p className="acc-content__cred__label">Birthday</p>
                  <p className="acc-content__cred__detail">{birthday}</p>
                </div>

                <div className="acc-content__buttons">
                  <a
                    className="btn btn-positive acc-content__buttons__editProfile"
                    href={`/accounts/${username}/edit`}
                  >
                    <p>Edit Profile</p>
                  </a>
                  <button
                    className="btn btn-negative acc-content__buttons__logout"
                    type="submit"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                  {/* <a href={`/accounts/${username}/wishlist`}> View Wishlist </a> */}
                  {/* <a href={`/accounts/${username}/friends/view`}> View Friends </a> */}
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return <Navigate to={`/login`} />;
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

export default withParams(Account);
