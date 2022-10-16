import React, { Component } from "react";
import Navbar from "./Navbar";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isAuth: false,
            retrievedSearch: false,
            keyword: "",
            items: {
                id: -1,
                item_name: "",
                description: "",
                purchasable: false,
                platform: "",
                url: "",
                deliveryFee: 0.0,
                rating: 0.0,
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchItem = this.searchItem.bind(this);
    }

    componentDidMount() {
        fetch("/api/v1/accounts/login")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "error_user_has_login") {
                    this.setState({
                        isAuth: true,
                        username: json.username,
                    });
                }
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    searchItem(e) {
        const { keyword } = this.state;
        e.preventDefault();

        fetch("/api/v1/main/search?keyword=" + keyword)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "OK") {
                    this.setState({
                        retrievedSearch: true,
                        items: json.result,
                    });
                }
            });
    }
    render() {
        const { retrievedSearch } = this.state;
        const { items } = this.state;
        const { isAuth } = this.state;

        return (
            <div>
                <Navbar key={isAuth} />
                <form onSubmit={this.searchItem}>
                    <input
                        required
                        type="text"
                        name="keyword"
                        placeholder="eg: Laptop"
                        onChange={this.handleChange}
                    />
                    <button className="btn-positive">Search</button>
                </form>

                {retrievedSearch &&
                    items.map((item) => (
                        <div key={item.id}>
                            <ul>
                                <li>{item.item_name}</li>
                                <li>{item.purchasable.toString()}</li>
                                <li>{item.platform}</li>
                                <li>{item.deliveryFee}</li>
                                <li>{item.rating}</li>
                                <li>
                                    <a href={item.url}>Link</a>
                                </li>
                            </ul>
                        </div>
                    ))}
            </div>
        );
    }
}
