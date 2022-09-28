import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

class EditAccount extends Component {
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.userAuth = this.userAuth.bind(this);
  }

  componentDidMount() {
    this.userAuth();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  updateUserData(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        name: this.state.name,
        birthday: this.state.birthday,
      }),
    };

    fetch("/api/accounts/edit", requestOptions)
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

  userAuth() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        username: this.state.username,
      }),
    };
    fetch("/api/accounts/authenticate", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ error: json.error });
        if (this.state.error != "OK") {
          this.setState({
            redirect: true,
          });
        }
      });
  }

  render() {
    this.userAuth;
    const { redirect } = this.state;
    const { username } = this.state;

    if (!redirect) {
      return (
        <>
          <div>
            <div>{this.state.error != "OK" && <p>{this.state.error}</p>}</div>
            <div>
              <form onSubmit={this.updateUserData}>
                <div>
                  <label>Username</label>
                  <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    onChange={this.handleChange}
                  />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    onChange={this.handleChange}
                  />
                </div>

                <div>
                  <label>Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.handleChange}
                  />
                </div>

                <div>
                  <label>Birthday</label>
                  <input
                    required
                    type="date"
                    name="birthday"
                    id="birthday"
                    onChange={this.handleChange}
                  />
                </div>

                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </>
      );
    } else {
      return <Navigate to={`/accounts/${username}`} />;
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

export default withParams(EditAccount);
