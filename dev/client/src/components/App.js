import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
import EmailAuth from "./EmailAuth";
import Signup from "./Signup";
import Login from "./Login";
import Account from "./Account";
import EditAccount from "./EditAccount";
import Wishlist from "./Wishlist";
import ForgetPassEmail from "./ForgetPassEmail";
import ForgetPassOTP from "./ForgetPassOTP";
import ViewFriends from "./ViewFriends";
import AddFriends from "./AddFriends";
import Help from "./Help";
import About from "./About";
import UpdateCredentials from "./UpdateCredentials";
import Landing from "./Landing";
import "../../static/css/styles.css";
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
                        <Route path="/" element={<Landing />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="signup/authenticate/:email"
                            element={<EmailAuth />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/login/forgetpassword"
                            element={<ForgetPassEmail />}
                        />
                        <Route
                            path="/login/forgetpassword/authenticate/:email"
                            element={<ForgetPassOTP />}
                        />
                        <Route
                            path="/login/forgetpassword/update/:email"
                            element={<UpdateCredentials />}
                        />
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
                        <Route
                            path="accounts/:username/friends/view"
                            element={<ViewFriends />}
                        />
                        <Route
                            path="accounts/:username/friends/add"
                            element={<AddFriends />}
                        />
                        <Route path="/help" element={<Help />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Router>
            </>
        );
    }
}

const AppDiv = document.getElementById("app");
render(<App />, AppDiv);
