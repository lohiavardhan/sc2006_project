import "../../static/css/LoaderFullPage.css";
import React, { Component } from "react";
import { HashLoader } from "react-spinners";

export default class Help extends Component {
  render() {
    return (
      <>
        <div className="loaderFullPage-container">
          <HashLoader color={"#1f7b6f"} size={100} />
        </div>
      </>
    );
  }
}
