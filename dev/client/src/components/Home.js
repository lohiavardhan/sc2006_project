import React, { Component } from "react";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isAuth: true,
            error_message: "",
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
                addedToWishlist: false,
            },
            hasRecommend: false,
            recommendedItems: {
                id: -1,
                item_name: "",
                description: "",
                purchasable: false,
                platform: "",
                url: "",
                deliveryFee: 0.0,
                rating: 0.0,
                addedToWishlist: false,
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchItem = this.searchItem.bind(this);
    }

    componentDidMount() {
        fetch("/api/v1/main")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error != "status_OK") {
                    this.setState({
                        isAuth: false,
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
                if (json.error == "status_OK") {
                    this.setState({
                        items: json.result,
                        retrievedSearch: true,
                    });
                } else {
                    this.setState({
                        error_message: json.error_message,
                        retrievedSearch: false,
                    });
                }

                if (json.recommend.length != 0) {
                    this.setState({
                        recommendedItems: json.recommend,
                        hasRecommend: true,
                    });
                }
            });
    }

    render() {
        const { error_message } = this.state;
        const { items } = this.state;
        const { isAuth } = this.state;
        const { retrievedSearch } = this.state;
        const { hasRecommend } = this.state;
        const { recommendedItems } = this.state;

        if (isAuth) {
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
                                    <li>{item.addedToWishlist.toString()}</li>
                                    <li>
                                        <a href={item.url}>Link</a>
                                    </li>
                                </ul>
                            </div>
                        ))}

                    {!retrievedSearch && <div>{error_message}</div>}
                    <hr />
                    <div>
                        <h2>You may also like:</h2>
                        {hasRecommend &&
                            recommendedItems.map((item) => (
                                <div key={item.id}>
                                    <ul>
                                        <li>{item.item_name}</li>
                                        <li>{item.purchasable.toString()}</li>
                                        <li>{item.platform}</li>
                                        <li>{item.deliveryFee}</li>
                                        <li>{item.rating}</li>
                                        <li>
                                            {item.addedToWishlist.toString()}
                                        </li>
                                        <li>
                                            <a href={item.url}>Link</a>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        {!hasRecommend && retrievedSearch && (
                            <div>
                                Your recommendation will show up once you
                                searched at least 10 times.
                            </div>
                        )}
                        {!hasRecommend && !retrievedSearch && (
                            <div>Happy hunting!</div>
                        )}
                    </div>
                </div>
            );
        } else {
            return <Navigate to={`/login`} />;
        }
    }
}
