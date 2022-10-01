import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
import EmailAuth from "./EmailAuth";
import Signup from "./Signup";
import Login from "./Login";
import Account from "./Account";
import EditAccount from "./EditAccount";
import Wishlist from "./Wishlist";
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
                        <Route
                            path="signup/authenticate/:email"
                            element={<EmailAuth />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="accounts/:username"
                            element={<Account />}
                        />
                        <Route
                            path="accounts/:username/edit"
                            element={<EditAccount />}
                        />
                        <Route
                            path="accounts/:username/wishlist"
                            element={<Wishlist />}
                        />
                    </Routes>
                </Router>
            </>
        );
    }
}

const AppDiv = document.getElementById("app");
render(<App />, AppDiv);
