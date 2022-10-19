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
                item_discounted_price: "",
                item_price: "",
                description: "",
                purchasable: false,
                platform: "",
                item_url: "",
                image_url: "",
                deliveryFee: 0.0,
                rating: 0.0,
                numOfRating: "",
                addedToWishlist: false,
                page: 0,
            },
            hasRecommend: false,
            recommendedItems: {
                id: -1,
                item_name: "",
                item_discounted_price: "",
                item_price: "",
                description: "",
                purchasable: false,
                platform: "",
                item_url: "",
                image_url: "",
                deliveryFee: 0.0,
                rating: 0.0,
                numOfRating: "",
                addedToWishlist: false,
            },
            currentPageNum: 0,
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
        const { currentPageNum } = this.state;
        console.log(items);

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

                                {retrievedSearch && (
                                    <div className="all-items">
                                        {items.map(
                                            (item) =>
                                                currentPageNum == item.page && (
                                                    <div className="item-container">
                                                        <div
                                                            className="item-props"
                                                            key={item.id}
                                                        >
                                                            <img
                                                                className="item-image"
                                                                src={
                                                                    item.image_url
                                                                }
                                                            ></img>
                                                            <ul className="item-data">
                                                                <li className="item-name">
                                                                    <h1>
                                                                        {
                                                                            item.item_name
                                                                        }
                                                                    </h1>
                                                                </li>
                                                                <li>
                                                                    {item.platform ==
                                                                        "Shopee" && (
                                                                        <div>
                                                                            <img
                                                                                width="45px"
                                                                                height="45px"
                                                                                src="https://img.icons8.com/color/344/shopee.png"
                                                                            ></img>
                                                                        </div>
                                                                    )}
                                                                    {item.platform ==
                                                                        "Amazon" && (
                                                                        <div>
                                                                            <img
                                                                                width="45px"
                                                                                height="45px"
                                                                                src="https://img.icons8.com/color/344/amazon.png"
                                                                            ></img>
                                                                        </div>
                                                                    )}
                                                                    {item.platform ==
                                                                        "Lazada" && (
                                                                        <div>
                                                                            <img
                                                                                width="45px"
                                                                                height="45px"
                                                                                src="https://img.icons8.com/plasticine/344/lazada.png"
                                                                            ></img>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                                <div className="price">
                                                                    {item.item_price ==
                                                                        -1 && (
                                                                        <div className="price-text">
                                                                            <div className="discounted-price">
                                                                                S${" "}
                                                                                {item.item_discounted_price.toFixed(
                                                                                    2
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {item.item_price !=
                                                                        -1 && (
                                                                        <div className="price-text">
                                                                            <div className="default-price">
                                                                                S${" "}
                                                                                {item.item_price.toFixed(
                                                                                    2
                                                                                )}
                                                                            </div>
                                                                            <div className="discounted-price">
                                                                                S${" "}
                                                                                {item.item_discounted_price.toFixed(
                                                                                    2
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <ul className="deliveryFee-ratings">
                                                                    <li className="deliveryfee">
                                                                        <i class="fa-solid fa-truck"></i>{" "}
                                                                        {item.deliveryFee ==
                                                                            0.0 && (
                                                                            <div className="deliveryfee-text">
                                                                                Free
                                                                                <p>
                                                                                    (Subject
                                                                                    to
                                                                                    platform
                                                                                    T&C)
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        {item.deliveryFee !=
                                                                            0.0 && (
                                                                            <div className="deliveryfee-text">
                                                                                S$
                                                                                {
                                                                                    "    "
                                                                                }
                                                                                {item.deliveryFee.toFixed(
                                                                                    2
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                    <li className="rating">
                                                                        <div className="rating-prop">
                                                                            <i className="fa-solid fa-star"></i>
                                                                            <div className="rating-text">
                                                                                {item.rating.toFixed(
                                                                                    2
                                                                                )}{" "}
                                                                                (
                                                                                {
                                                                                    item.numOfRating
                                                                                }{" "}
                                                                                reviews)
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                                <div className="wishlist-item-link">
                                                                    <li className="wishlist-data">
                                                                        {item.addedToWishlist && (
                                                                            <div>
                                                                                <button className="added-to-wishlist">
                                                                                    <i class="fa-solid fa-heart"></i>
                                                                                </button>{" "}
                                                                                {
                                                                                    "   "
                                                                                }
                                                                                Remove
                                                                                from
                                                                                wish
                                                                                list
                                                                            </div>
                                                                        )}
                                                                        {!item.addedToWishlist && (
                                                                            <div>
                                                                                <button className="removed-from-wishlist">
                                                                                    <i class="fa-regular fa-heart"></i>
                                                                                </button>{" "}
                                                                                {
                                                                                    "   "
                                                                                }
                                                                                Add
                                                                                to
                                                                                wish
                                                                                list
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                    <li className="item-url">
                                                                        <button className="visit-link-button">
                                                                            <a
                                                                                href={
                                                                                    item.item_url
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    Buy
                                                                                </p>
                                                                            </a>
                                                                        </button>
                                                                    </li>
                                                                </div>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                        )}{" "}
                                    </div>
                                )}

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
