import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
import Auth from "./Auth";
import Signup from "./Signup";
import Login from "./Login";
import Account from "./Account";
import EditAccount from "./EditAccount";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="signup/authenticate/:email" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="accounts/:username" element={<Account />} />
            <Route path="accounts/:username/edit" element={<EditAccount />} />
          </Routes>
        </Router>
      </>
    );
  }
}

const AppDiv = document.getElementById("app");
render(<App />, AppDiv);
