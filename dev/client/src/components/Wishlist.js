import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    let { username } = this.props.params;
    this.state = {
      username: username,
      wishlist: [
        {
          id: "",
          item_name: "",
          user: "",
          purchasable: false,
          added_at: "",
          session_key: "",
          platform: "",
          url: "",
        },
      ],
      error: null,
      redirect: false,
    };
    this.getUserWishlist = this.getUserWishlist.bind(this);
  }

  componentDidMount() {
    this.getUserWishlist();
  }

  getUserWishlist() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        user: this.state.username,
      }),
    };

    fetch("/api/accounts/wishlist", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ error: json.error });
        if (this.state.error == "OK") {
          this.setState({
            wishlist: json.payload,
          });
        }
      });
  }

  render() {
    const { wishlist } = this.state;
    const { error } = this.state;
    this.getUserWishlist;
    return (
      <div>
        {error == "OK" &&
          wishlist.map((item) => (
            <div>
              <ul>
                <li>{item.id}</li>
                <li>{item.item_name}</li>
                <li>{item.user}</li>
                <li>{item.purchasable.toString()}</li>
                <li>{item.added_at}</li>
                <li>{item.session_key}</li>
                <li>{item.platform}</li>
                <li>
                  <a href={item.url}>Link</a>
                </li>
              </ul>
            </div>
          ))}
        {error != "OK" && <div>{error}</div>}
      </div>
    );
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

export default withParams(Wishlist);
