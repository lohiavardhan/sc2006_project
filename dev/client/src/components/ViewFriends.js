import "../../static/css/Friends.css";
import React, { Component } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AccountSideBar from "./AccountSideBar";

class ViewFriends extends Component {
  constructor(props) {
    super(props);
    let { username } = this.props.params;
    this.state = {
      username: username,
      retrievedFriendlist: false,
      friendlist: [
        {
          id: -1,
          username: "",
          name: "",
          birthday: "",
          accepted: false,
          requested: false,
        },
      ],
      error_message: "NULL",
      redirect: false,
      searchName: "",
      retrievedSearch: false,
      retrievedUser: {
        name: "",
        birthday: "",
        username: "",
      },

      isAuth: true,
    };

    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.searchFriend = this.searchFriend.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/friends/view?username=" + this.state.username)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error == "status_invalid_access") {
          this.setState({
            isAuth: false,
          });
        } else {
          this.setState({
            friendlist: json.friends,
            retrievedFriendlist: true,
            username: json.username,
          });
        }
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleAccept(e) {
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

    fetch("/api/v1/friends/accept", requestOptions).then((response) => {
      return response.json();
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

    fetch("/api/v1/friends/reject", requestOptions).then((response) => {
      return response.json();
    });

    document.getElementById(`${name}+accept`).style.display = "none";
    document.getElementById(`${name}+reject`).style.display = "none";
    document.getElementById(`${name}+rejected-text`).style.display = "flex";
  }

  searchFriend(e) {
    const { searchName } = this.state;
    e.preventDefault();

    fetch("/api/v1/friends/search?username=" + searchName)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error == "status_OK") {
          this.setState({
            retrievedSearch: true,
            error_message: json.error_message,
            retrievedUser: json.friend,
          });
        } else if (json.error_message == "User searched is not found.") {
          this.setState({
            retrievedSearch: false,
            error_message: json.error_message,
          });
        } else {
          this.setState({
            retrievedSearch: true,
            error_message: json.error_message,
            retrievedUser: json.friend,
          });
        }
      });
  }

  addFriend(e) {
    const { retrievedUser } = this.state;
    console.log(retrievedUser.username);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        username: retrievedUser.username,
      }),
    };

    fetch("/api/v1/friends/add", requestOptions).then((response) => {
      return response.json();
    });

    document.getElementById(`${retrievedUser.username}+accept`).style.display =
      "none";
    document.getElementById(
      `${retrievedUser.username}+accepted-text`
    ).style.display = "flex";
  }

  render() {
    const { friendlist } = this.state;
    const { username } = this.state;
    const { error_message } = this.state;
    const { isAuth } = this.state;
    const { retrievedSearch } = this.state;
    const { retrievedUser } = this.state;
    const { retrievedFriendlist } = this.state;

    if (isAuth) {
      return (
        <>
          <Navbar />
          <div className="friends-container">
            <AccountSideBar key={username} tab={"ViewFriends"} />
            <div className="friends-content">
              <h1 className="title">Add Friend</h1>
              <form
                onSubmit={this.searchFriend}
                className="friends-content-search"
              >
                <input
                  required
                  type="text"
                  name="searchName"
                  placeholder="Search Username"
                  onChange={this.handleChange}
                />
                <button className="btn-positive">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              {error_message == "User searched is not found." && (
                <div>{error_message}</div>
              )}

              {retrievedSearch && (
                <div className="searched-user-container">
                  {/* <ul className="searched-header">
                    <li>Name</li>
                    <li>Username</li>
                    <li></li>
                  </ul> */}
                  <div>
                    <ul className="searched-user-details">
                      <li>{retrievedUser.name}</li>
                      <li>{"#" + retrievedUser.username}</li>
                      <li className="searched-user-details__buttons">
                        {error_message == "NULL" && (
                          <div>
                            <button
                              className="btn btn-positive btn-accept"
                              id={`${retrievedUser.username}+accept`}
                              onClick={this.addFriend}
                              name={retrievedUser.username}
                            >
                              <i class="fa-solid fa-user-plus"></i>
                            </button>
                            <div
                              className="text-accepted"
                              id={`${retrievedUser.username}+accepted-text`}
                              style={{
                                display: "none",
                              }}
                            >
                              Friend Request Sent!
                            </div>
                          </div>
                        )}
                        {error_message ==
                          "User searched is user themselves." && (
                          <div className="text-rejected">Myself</div>
                        )}
                        {error_message ==
                          "User searched is already a friend." && (
                          <div>
                            <a
                              href={`/accounts/${retrievedUser.username}/wishlist/view`}
                              className="btn btn-positive btn-wishlist"
                            >
                              <p>Wishlist</p>
                            </a>
                          </div>
                        )}
                        {error_message == "A friend request has been sent." && (
                          <div className="text-accepted">Request sent!</div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <hr className="line friends__line"></hr>
              <h1 className="title title--friendReq">Friend List</h1>

              {retrievedFriendlist && (
                <div>
                  <div className="searched-user-container">
                    {/* <ul className="searched-header">
                      <li>Name</li>
                      <li>Username</li>
                      <li></li>
                    </ul> */}
                  </div>
                </div>
              )}
              {retrievedFriendlist &&
                friendlist.map((friends) => (
                  <div key={friends.id}>
                    <ul className="searched-user-details">
                      <li>{friends.name}</li>
                      <li>{"#" + friends.username}</li>
                      <li className="searched-user-details__buttons">
                        {friends.requested && (
                          <div className="action-props text-accepted">
                            <div>Request sent!</div>
                          </div>
                        )}
                        {retrievedFriendlist &&
                          !friends.accepted &&
                          !friends.requested && (
                            <div className="action-props">
                              <button
                                id={`${friends.username}+accept`}
                                className="btn-positive btn-accept"
                                name={friends.username}
                                onClick={this.handleAccept}
                              >
                                Accept
                              </button>
                              <div
                                id={`${friends.username}+accepted-text`}
                                style={{
                                  display: "none",
                                }}
                              >
                                Accepted!
                              </div>
                              <button
                                id={`${friends.username}+reject`}
                                className="btn-negative btn-reject"
                                name={friends.username}
                                onClick={this.handleReject}
                              >
                                Reject
                              </button>
                              <div
                                className="text-rejected"
                                id={`${friends.username}+rejected-text`}
                                style={{
                                  display: "none",
                                }}
                              >
                                Rejected!
                              </div>
                            </div>
                          )}
                        {friends.accepted && (
                          <div className="action-props">
                            <a
                              href={`/accounts/${friends.username}/wishlist`}
                              className="btn btn-positive btn-wishlist"
                            >
                              <p>Wishlist</p>
                            </a>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </>
      );
    } else {
      return <Navigate to={`/home`} />;
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
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default withParams(ViewFriends);
