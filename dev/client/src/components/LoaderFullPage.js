import "../../static/css/LoaderFullPage.css";
import React, { Component } from "react";
import { SyncLoader } from "react-spinners";

export default class Help extends Component {
  render() {
    return (
      <>
        <div className="loaderFullPage-container">
          <SyncLoader color={"#1f7b6f"} />
        </div>
      </>
    );
  }
}
