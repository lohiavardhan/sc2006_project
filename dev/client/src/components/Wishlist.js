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
                    added_at: "",
                    session_key: "",
                    item: {
                        item_name: "",
                        purchasable: false,
                        platform: "",
                        url: "",
                        description: "",
                        deliveryFee: 0.0,
                        rating: 0.0,
                    },
                },
            ],
            error: null,
            redirect: false,
            isAuth: true,
        };
    }

    componentDidMount() {
        fetch("/api/v1/accounts/wishlist?username=" + this.state.username)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "error_not_auth") {
                    this.setState({
                        isAuth: false,
                    });
                } else if (json.error == "error_wishlist_invalid") {
                    this.setState({
                        error: "No wish list item added yet !!",
                    });
                } else {
                    this.setState({
                        wishlist: json.payload,
                        error: "OK",
                    });
                }
            });
    }

    render() {
        const { wishlist } = this.state;
        const { username } = this.state;
        const { redirect } = this.state;
        const { error } = this.state;
        const { isAuth } = this.state;
        if (isAuth) {
            return (
                <div>
                    <h1> {username}'s wishlist </h1>
                    <hr />
                    {error == "OK" &&
                        wishlist.map((item) => (
                            <div key={item.id}>
                                <ul>
                                    <li>{item.id}</li>
                                    <li>{item.added_at}</li>
                                    <li>{item.session_key}</li>
                                    <li>{item.item.item_name}</li>
                                    <li>{item.item.purchasable.toString()}</li>
                                    <li>{item.item.platform}</li>
                                    <li>
                                        <a href={item.item.url}>Link</a>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    {error != "OK" && <div>{error}</div>}
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

export default withParams(Wishlist);
