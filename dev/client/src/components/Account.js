import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

class Account extends Component {
    constructor(props) {
        super(props);
        let { username } = this.props.params;
        this.state = {
            username: username,
            email: "",
            name: "",
            birthday: "",
            error: null,
            redirect: false,
            isAuth: true,
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        fetch("/api/v1/accounts?username=" + this.state.username)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "OK") {
                    this.setState({
                        username: json.username,
                        email: json.email,
                        name: json.name,
                        birthday: json.birthday,
                    });
                } else {
                    this.setState({
                        isAuth: false,
                    });
                }
            });
    }

    logout() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        };

        fetch("/api/v1/accounts/logout", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({ error: json.error });
                if (this.state.error == "OK") {
                    this.setState({
                        redirect: true,
                    });
                }
            });
    }

    render() {
        const { name } = this.state;
        const { email } = this.state;
        const { username } = this.state;
        const { birthday } = this.state;
        const { redirect } = this.state;
        const { isAuth } = this.state;

        if (!redirect && isAuth) {
            return (
                <>
                    <Navbar key={isAuth} />
                    <div>
                        <ul>
                            <li>{name}</li>
                            <li> {username}</li>
                            <li>{email}</li>
                            <li>{birthday}</li>
                        </ul>
                        <div>
                            <a href={`/accounts/${username}/edit`}> Update </a>
                        </div>
                        <a href={`/accounts/${username}/wishlist`}>
                            {" "}
                            View Wishlist{" "}
                        </a>
                        <a href={`/accounts/${username}/friends/view`}>
                            {" "}
                            View Friends{" "}
                        </a>
                        <button type="submit" onClick={this.logout}>
                            Logout
                        </button>
                    </div>
                </>
            );
        } else {
            return <Navigate to={`/login`} />;
        }
    }
}

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

export default withParams(Account);
