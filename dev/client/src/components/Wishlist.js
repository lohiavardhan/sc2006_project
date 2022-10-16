import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

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
            error_message: "NULL",
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
                if (json.error == "status_invalid_access") {
                    this.setState({
                        isAuth: false,
                    });
                } else if (json.error == "status_invalid_query") {
                    this.setState({
                        error_message: json.error_message,
                    });
                } else {
                    this.setState({
                        username: json.username,
                        wishlist: json.payload,
                    });
                }
            });
    }

    render() {
        const { wishlist } = this.state;
        const { username } = this.state;
        const { redirect } = this.state;
        const { error_message } = this.state;
        const { isAuth } = this.state;
        if (isAuth) {
            return (
                <>
                    <Navbar key={isAuth} />
                    <div>
                        <h1> {username}'s wishlist </h1>
                        <hr />
                        {error_message == "NULL" &&
                            wishlist.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li>{item.id}</li>
                                        <li>{item.added_at}</li>
                                        <li>{item.session_key}</li>
                                        <li>{item.item.item_name}</li>
                                        <li>
                                            {item.item.purchasable.toString()}
                                        </li>
                                        <li>{item.item.platform}</li>
                                        <li>
                                            <a href={item.item.url}>Link</a>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        {error_message != "NULL" && <div>{error_message}</div>}
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
