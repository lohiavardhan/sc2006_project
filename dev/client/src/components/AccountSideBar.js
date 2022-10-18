import "../../static/css/AccountSideBar.css";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class AccountSideBar extends Component {
  constructor(props) {
    super(props);
    // let { username } = this.props.params;
    // this.state = {
    //   username: username,
    // };
  }

  //   componentDidMount() {
  //     fetch("/api/v1/accounts?username=" + this.state.username)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((json) => {
  //         if (json.error == "status_OK") {
  //           this.setState({
  //             username: json.username,
  //           });
  //         } else {
  //           this.setState({
  //             isAuth: false,
  //           });
  //         }
  //       });
  //   }

  render() {
    return (
      <>
        <div className="sidebar-container"></div>
        {/* <a href={`/accounts/${username}/friends/view`}> View Friends </a> */}
      </>
    );
  }
}
