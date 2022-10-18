import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "../../static/css/Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      redirect: false,
      isAuth: false,
      username: "",
    };
  }

  componentDidMount() {
    fetch("/api/v1/accounts/login")
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

  render() {
    const { isAuth } = this.state;
    const { username } = this.state;
    return (
      <>
        <nav class="justify-content-between">
          <div className="navbar-container">
            <a href="/home" className="navbar-logo">
              <span className="h1 text-uppercase text-dark bg-light px-2 logo-class-1">
                Find
              </span>
              <span className="h1 text-uppercase text-light px-2 ml-n1 logo-class-2">
                R
              </span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {!isAuth && (
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="right">
                  <a
                    className="navbar-links-help nav-item nav-link"
                    href="/help"
                  >
                    Help
                  </a>
                  <a
                    className="navbar-links-login nav-item nav-link"
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    className="navbar-links-signup nav-item nav-link"
                    href="/signup"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            )}
            {isAuth && (
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a
                    className="navbar-links-help nav-item nav-link"
                    href="/help"
                  >
                    Help
                  </a>
                  <a
                    className="nav-item nav-link active nav-bar-auth-true"
                    href={`/accounts/${username}`}
                  >
                    Account
                  </a>
                  <a
                    className="nav-item nav-link nav-bar-auth-true"
                    href={`/accounts/${username}/wishlist`}
                  >
                    Wishlist
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
        {/*
                <form class="nav-search">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                     <button class="button-for-searching" type="submit">Search</button>
                </form>
                    */}
      </>
    );
  }
}

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default withParams(Navbar);
