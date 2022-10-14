import "../../static/css/Friends.css";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

class ViewFriends extends Component {
    constructor(props) {
        super(props);
        let { username } = this.props.params;
        this.state = {
            username: username,
            friendlist: [
                {
                    id: -1,
                    username: "",
                    name: "",
                    birthday: "",
                    accepted: false,
                },
            ],
            error: null,
            redirect: false,
            isAuth: true,
        };

        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    componentDidMount() {
        fetch("/api/v1/friends/view?username=" + this.state.username)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "error_not_auth") {
                    this.setState({
                        isAuth: false,
                    });
                } else {
                    this.setState({
                        redirect: false,
                        friendlist: json.friends,
                        username: json.username,
                        error: "OK",
                    });
                }
            });
    }

    handleAccept(e) {
        const { name } = e.target;
        console.log(name);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                username: name,
            }),
        };

        fetch("/api/v1/friends/accept", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "OK") {
                    this.setState({ redirect: true });
                }
            });

        document.getElementById(`${name}+accept`).style.display = "none";
        document.getElementById(`${name}+reject`).style.display = "none";
        document.getElementById(`${name}+accepted-text`).style.display = "flex";
    }

    handleReject(e) {
        e.preventDefault();
        const { name } = e.target;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                username: name,
            }),
        };

        fetch("/api/v1/friends/reject", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "OK") {
                    this.setState({ redirect: true });
                }
            });

        document.getElementById(`${name}+accept`).style.display = "none";
        document.getElementById(`${name}+reject`).style.display = "none";
        document.getElementById(`${name}+rejected-text`).style.display = "flex";
    }

    render() {
        const { friendlist } = this.state;
        const { username } = this.state;
        const { redirect } = this.state;
        const { error } = this.state;
        const { isAuth } = this.state;
        console.log(redirect);
        if (isAuth) {
            return (
                <div>
                    <h1> {username}'s friendlist </h1>
                    <hr />
                    {error == "OK" &&
                        friendlist.map((friends) => (
                            <div key={friends.id}>
                                <ul>
                                    <li>{friends.name}</li>
                                    <li>{friends.username}</li>
                                    <li>{friends.birthday}</li>
                                    <li> Yoyo</li>
                                    {!friends.accepted && (
                                        <div>
                                            <button
                                                id={`${friends.username}+accept`}
                                                className="btn-positive"
                                                name={friends.username}
                                                onClick={this.handleAccept}
                                            >
                                                Accept
                                            </button>
                                            <div
                                                id={`${friends.username}+accepted-text`}
                                                style={{ display: "none" }}
                                            >
                                                Accepted
                                            </div>
                                            <button
                                                id={`${friends.username}+reject`}
                                                className="btn-negative"
                                                name={friends.username}
                                                onClick={this.handleReject}
                                            >
                                                Reject
                                            </button>
                                            <div
                                                id={`${friends.username}+rejected-text`}
                                                style={{ display: "none" }}
                                            >
                                                Rejected
                                            </div>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        ))}
                </div>
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

export default withParams(ViewFriends);
