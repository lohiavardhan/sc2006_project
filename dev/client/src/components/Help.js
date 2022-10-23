import "../../static/css/LoginSignup.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export default class Help extends Component {
  render() {
    return (
      <>
        <Navbar />
        <h1 className="title">Help</h1>
      </>
    );
  }
}
