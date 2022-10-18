import React, { Component } from "react";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import "../../static/css/Home.css";

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
            price: "ALL",
            platform: "ALL",
            deliveryFee: "ALL",
            rating: "ALL",
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        fetch("/api/v1/main")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json.username);
                if (json.error != "status_OK") {
                    this.setState({
                        isAuth: false,
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

    handleFilter(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    handleReset(e) {
        try {
            document.querySelector(
                'input[name="platform"]:checked'
            ).checked = false;
        } catch {}
        try {
            document.querySelector(
                'input[name="rating"]:checked'
            ).checked = false;
        } catch {}
        document.querySelector('input[name="price"]').value = 50;
        document.querySelector('input[name="deliveryFee"]').value = 50;
        this.setState({
            price: "ALL",
            platform: "ALL",
            rating: "ALL",
            deliveryFee: "ALL",
        });
    }

    render() {
        const { error_message } = this.state;
        const { username } = this.state;
        const { items } = this.state;
        const { isAuth } = this.state;
        const { retrievedSearch } = this.state;
        const { hasRecommend } = this.state;
        const { recommendedItems } = this.state;
        const { price } = this.state;
        const { platform } = this.state;
        const { rating } = this.state;
        const { deliveryFee } = this.state;

        if (isAuth) {
            return (
                <>
                    <Navbar />
                    <div>
                        <div className="home-searchbar">
                            <p>Search for an item: </p>
                            <form onSubmit={this.searchItem}>
                                <input
                                    required
                                    type="text"
                                    name="keyword"
                                    placeholder="eg: Laptop"
                                    onChange={this.handleChange}
                                />
                                <button>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                        <div className="search-view">
                            <div className="filter-view">
                                <div className="filter-parameter">
                                    <div className="price-display">
                                        <label> Price </label>
                                        <div>{price}</div>
                                    </div>

                                    <div className="slidecontainer">
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            defaultValue="50"
                                            className="slider"
                                            name="price"
                                            onChange={this.handleFilter}
                                        />
                                    </div>
                                </div>
                                <div className="filter-parameter">
                                    <label> Platform </label>

                                    <div className="platform-list">
                                        <div>
                                            <input
                                                type="radio"
                                                name="platform"
                                                onChange={this.handleFilter}
                                            />{" "}
                                            Lazada
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="platform"
                                                onChange={this.handleFilter}
                                            />{" "}
                                            Amazon
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-parameter">
                                    <div className="price-display">
                                        <label> Delivery Fee </label>
                                        <div>{deliveryFee}</div>
                                    </div>

                                    <div className="slidecontainer">
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            defaultValue="50"
                                            className="slider"
                                            name="deliveryFee"
                                            onChange={this.handleFilter}
                                        />
                                    </div>
                                </div>
                                <div className="filter-parameter">
                                    <label> Rating </label>

                                    <div className="rating-list">
                                        <div>
                                            <input
                                                type="radio"
                                                name="rating"
                                                onChange={this.handleFilter}
                                            />
                                            {"  "}
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="rating"
                                                onChange={this.handleFilter}
                                            />
                                            {"  "}
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="rating"
                                                onChange={this.handleFilter}
                                            />
                                            {"  "}
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-regular fa-star"></i>
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="rating"
                                                onChange={this.handleFilter}
                                            />
                                            {"  "}
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-regular fa-star"></i>
                                            <i className="fa-regular fa-star"></i>
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="reset-filter"
                                    onClick={this.handleReset}
                                >
                                    <i class="fa-solid fa-rotate-left"></i>
                                </button>
                                <button className="submit-filter">
                                    Filter
                                </button>
                            </div>
                            <div className="item-view">
                                {!retrievedSearch && error_message == "" && (
                                    <div className="placeholder-during-nosearch">
                                        <img alt="art"></img>
                                        <p>Begin by searching for an item.</p>
                                    </div>
                                )}

                                {!retrievedSearch && error_message != "" && (
                                    <div className="placeholder-during-nosearch">
                                        <img alt="art"></img>
                                        {error_message}
                                    </div>
                                )}

                                {retrievedSearch &&
                                    items.map((item) => (
                                        <div key={item.id}>
                                            <ul>
                                                <li>{item.item_name}</li>
                                                <li>
                                                    {item.purchasable.toString()}
                                                </li>
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

                                <hr />
                                <div className="recommended-item-section">
                                    <h1>You may also like:</h1>
                                    {hasRecommend &&
                                        recommendedItems.map((item) => (
                                            <div key={item.id}>
                                                <ul>
                                                    <li>{item.item_name}</li>
                                                    <li>
                                                        {item.purchasable.toString()}
                                                    </li>
                                                    <li>{item.platform}</li>
                                                    <li>{item.deliveryFee}</li>
                                                    <li>{item.rating}</li>
                                                    <li>
                                                        {item.addedToWishlist.toString()}
                                                    </li>
                                                    <li>
                                                        <a href={item.url}>
                                                            Link
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    {!hasRecommend && retrievedSearch && (
                                        <div>
                                            Your recommendation will show up
                                            once you searched at least 10 times.
                                        </div>
                                    )}
                                    {!hasRecommend && !retrievedSearch && (
                                        <div>Happy hunting!</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return <Navigate to={`/login`} />;
        }
    }
}
