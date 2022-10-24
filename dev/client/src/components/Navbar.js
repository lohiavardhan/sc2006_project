import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "../../static/css/Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            username: json.username,
          });
        }
      });
  }

  render() {
    const { username } = this.state;
    return (
      <>
        <div className="navbar-container">
          <a href="/home" className="navbar__logo">
            <span>Find</span>
            <span>R</span>
          </a>

          <div className="navbar__logged-in">
            <a className="navbar__icons" href="/help">
              <i className="fa-regular fa-circle-question"></i>
            </a>
            <a
              className="navbar__icons"
              href={`/accounts/${username}/wishlist`}
            >
              <i className="fa-regular fa-heart"></i>
            </a>
            <a className="navbar__icons" href={`/accounts/${username}`}>
              <i className="fa-regular fa-user"></i>
            </a>
          </div>
        </div>
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
