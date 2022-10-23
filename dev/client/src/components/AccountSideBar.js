import "../../static/css/AccountSideBar.css";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

class AccountSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isAuth: true,
      redirect: false,
      activeTab: this.props.tab,
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
    const { redirect } = this.state;
    const { isAuth } = this.state;
    const { activeTab } = this.state;

    {
      return (
        <>
          <div className="sidebar-container">
            <div className="circle">
              <i className="fa-solid fa-user"></i>
            </div>
            <a
              className={
                activeTab == "Account"
                  ? "sidebar-container__tab sidebar-container__tab--top tab--active"
                  : "sidebar-container__tab sidebar-container__tab--top"
              }
              href={`/accounts/${username}`}
            >
              <p>Account Overview</p>
            </a>

            <a
              className={
                activeTab == "ViewFriends"
                  ? "sidebar-container__tab tab--active"
                  : "sidebar-container__tab"
              }
              href={`/accounts/${username}/friends/view`}
            >
              <p>Friends</p>
            </a>

            <a
              className={
                activeTab == "AddFriends"
                  ? "sidebar-container__tab tab--active"
                  : "sidebar-container__tab"
              }
              href={`/accounts/${username}/friends/add`}
            >
              <p>Add Friends</p>
            </a>
          </div>
        </>
      );
    }
  }
}

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default withParams(AccountSideBar);
