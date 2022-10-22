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
            max_price: -1,
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
            currentPageNum: 1,
            price: "ALL",
            platform: "ALL",
            deliveryFee: "ALL",
            rating: "ALL",
            searchedItem: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilterSearch = this.handleFilterSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
        this.handleRemoveFromWishlist =
            this.handleRemoveFromWishlist.bind(this);
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
                console.log(json.max_price);
                if (json.error == "status_OK") {
                    this.setState({
                        items: json.result,
                        retrievedSearch: true,
                        searchedItem: keyword,
                        max_price: json.max_price,
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

    handleFilterSearch(e) {
        const { keyword } = this.state;
        const { platform } = this.state;
        const { price } = this.state;
        const { deliveryFee } = this.state;
        const { max_price } = this.state;
        const { rating } = this.state;
        const previous_max_price = max_price;

        fetch(
            "/api/v1/main/search/filter?keyword=" +
                keyword +
                "&platform=" +
                platform +
                "&rating=" +
                rating +
                "&deliveryFee=" +
                deliveryFee +
                "&price=" +
                price
        )
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "status_OK") {
                    this.setState({
                        items: json.result,
                        retrievedSearch: true,
                        searchedItem: keyword,
                        max_price: json.max_price,
                    });
                } else {
                    this.setState({
                        error_message: json.error_message,
                        retrievedSearch: true,
                        items: json.result,
                        max_price: previous_max_price,
                    });
                }
            });
    }

    handleReset(e) {
        const { max_price } = this.state;
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
        document.querySelector('input[name="price"]').value = max_price / 2;
        document.querySelector('input[name="deliveryFee"]').value = 5;
        this.setState({
            price: "ALL",
            platform: "ALL",
            rating: "ALL",
            deliveryFee: "ALL",
        });
    }

    nextPage(e) {
        this.setState({
            currentPageNum: +this.state.currentPageNum + 1,
        });
    }

    previousPage(e) {
        this.setState({
            currentPageNum: +this.state.currentPageNum - 1,
        });
    }

    setCurrentPage(data) {
        let newPage = data;

        this.setState({
            currentPageNum: newPage,
        });
    }

    handleAddToWishlist(item_id) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                item_id: item_id,
            }),
        };

        fetch("/api/v1/accounts/wishlist/add", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "status_OK") {
                    this.handleFilterSearch();
                }
            });
    }

    handleRemoveFromWishlist(item_id) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                item_id: item_id,
            }),
        };

        fetch("/api/v1/accounts/wishlist/remove", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error == "status_OK") {
                    this.handleFilterSearch();
                }
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
        const { searchedItem } = this.state;
        const { max_price } = this.state;

        console.log(recommendedItems);
        console.log(hasRecommend);

        if (isAuth) {
            return (
                <>
                    <div className="home-page">
                        <Navbar />

                        <div className="home-searchbar">
                            <form onSubmit={this.searchItem}>
                                <input
                                    required
                                    type="text"
                                    name="keyword"
                                    placeholder="eg: Laptop"
                                    onChange={this.handleChange}
                                />
                                <button className="btn btn-positive">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>

                        <div className="search-view">
                            {retrievedSearch && (
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
                                                max={max_price}
                                                defaultValue={max_price / 2}
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
                                                    value="Shopee"
                                                    onChange={this.handleFilter}
                                                />{" "}
                                                Shopee
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="platform"
                                                    value="Lazada"
                                                    onChange={this.handleFilter}
                                                />{" "}
                                                Lazada
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="platform"
                                                    value="Amazon"
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
                                                min="0"
                                                max="10"
                                                defaultValue="5"
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
                                                    value="5"
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
                                                    value="4"
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
                                                    value="3"
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
                                                    value="2"
                                                    onChange={this.handleFilter}
                                                />
                                                {"  "}
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value="1"
                                                    onChange={this.handleFilter}
                                                />
                                                {"  "}
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={this.handleFilterSearch}
                                        className="submit-filter"
                                    >
                                        Filter
                                    </button>
                                    <button
                                        className="reset-filter"
                                        onClick={this.handleReset}
                                    >
                                        <i class="fa-solid fa-rotate-left"></i>
                                    </button>
                                </div>
                            )}

                            <div className="item-view">
                                {!retrievedSearch && error_message == "" && (
                                    <div className="placeholder-during-nosearch">
                                        {/* <img alt="art"></img> */}
                                        <h1 className="search__heading">
                                            Begin by searching for an item.
                                        </h1>
                                        <p>
                                            Use the search bar above to search
                                            for any item
                                        </p>
                                        <img src="https://img.icons8.com/plasticine/100/000000/search-more.png" />
                                    </div>
                                )}
                                {!retrievedSearch && error_message != "" && (
                                    <div className="placeholder-during-nosearch">
                                        <h1 className="search__heading">
                                            {" "}
                                            {error_message}
                                        </h1>
                                        <p>
                                            Sorry, we cannot find any results
                                            for your search item
                                        </p>
                                        <img
                                            alt="No results icon"
                                            src="https://img.icons8.com/stickers/100/000000/nothing-found.png"
                                        />
                                    </div>
                                )}
                                {retrievedSearch && (
                                    <div className="search__items-found">
                                        <h2 className="search__heading">
                                            {searchedItem}
                                        </h2>
                                        <p>{items.length + " items found"}</p>
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
                                                            <div className="item-picture">
                                                                <img
                                                                    className="item-picture__image"
                                                                    src={
                                                                        item.image_url
                                                                    }
                                                                ></img>
                                                                <div className="item-picture__brand-logo">
                                                                    {item.platform ==
                                                                        "Shopee" && (
                                                                        <div className="item-picture__brand-logo__circle">
                                                                            <img
                                                                                width="45px"
                                                                                height="45px"
                                                                                src="https://img.icons8.com/color/344/shopee.png"
                                                                            ></img>
                                                                        </div>
                                                                    )}
                                                                    {item.platform ==
                                                                        "Amazon" && (
                                                                        <div className="item-picture__brand-logo__circle">
                                                                            <img
                                                                                width="45px"
                                                                                height="45px"
                                                                                src="https://img.icons8.com/color/344/amazon.png"
                                                                            ></img>
                                                                        </div>
                                                                    )}
                                                                    {item.platform ==
                                                                        "Lazada" && (
                                                                        <div className="item-picture__brand-logo__circle">
                                                                            <img
                                                                                width="45px"
                                                                                height="45px"
                                                                                src="https://img.icons8.com/plasticine/344/lazada.png"
                                                                            ></img>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="item-picture__wishlist">
                                                                    <div className="wishlist-data">
                                                                        {item.addedToWishlist && (
                                                                            <button className="added-to-wishlist">
                                                                                <i
                                                                                    onClick={() =>
                                                                                        this.handleRemoveFromWishlist(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="fa-solid fa-heart"
                                                                                ></i>
                                                                            </button>
                                                                        )}
                                                                        {!item.addedToWishlist && (
                                                                            <button className="removed-from-wishlist">
                                                                                <i
                                                                                    onClick={() =>
                                                                                        this.handleAddToWishlist(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="fa-regular fa-heart"
                                                                                ></i>
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <ul className="item-data">
                                                                <li className="item-name">
                                                                    <p>
                                                                        {
                                                                            item.item_name
                                                                        }
                                                                    </p>
                                                                </li>

                                                                <li className="price">
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
                                                                </li>
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
                                                                <li className="item-url">
                                                                    <button className="btn btn-positive visit-link-button">
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
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                )}
                                {retrievedSearch && (
                                    <div className="recommended-item-section">
                                        <hr className="line search__line" />
                                        <h2 className="search__heading">
                                            You may also like:
                                        </h2>

                                        {hasRecommend && (
                                            <div className="all-items">
                                                {recommendedItems.map(
                                                    (recommendedItem) => (
                                                        <div className="item-container">
                                                            <div
                                                                className="item-props"
                                                                key={
                                                                    recommendedItem.id
                                                                }
                                                            >
                                                                <div className="item-picture">
                                                                    <img
                                                                        className="item-picture__image"
                                                                        src={
                                                                            recommendedItem.image_url
                                                                        }
                                                                    ></img>
                                                                    <div className="item-picture__brand-logo">
                                                                        {recommendedItem.platform ==
                                                                            "Shopee" && (
                                                                            <div className="item-picture__brand-logo__circle">
                                                                                <img
                                                                                    width="45px"
                                                                                    height="45px"
                                                                                    src="https://img.icons8.com/color/344/shopee.png"
                                                                                ></img>
                                                                            </div>
                                                                        )}
                                                                        {recommendedItem.platform ==
                                                                            "Amazon" && (
                                                                            <div className="item-picture__brand-logo__circle">
                                                                                <img
                                                                                    width="45px"
                                                                                    height="45px"
                                                                                    src="https://img.icons8.com/color/344/amazon.png"
                                                                                ></img>
                                                                            </div>
                                                                        )}
                                                                        {recommendedItem.platform ==
                                                                            "Lazada" && (
                                                                            <div className="item-picture__brand-logo__circle">
                                                                                <img
                                                                                    width="45px"
                                                                                    height="45px"
                                                                                    src="https://img.icons8.com/plasticine/344/lazada.png"
                                                                                ></img>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="item-picture__wishlist">
                                                                        <div className="wishlist-data">
                                                                            {recommendedItem.addedToWishlist && (
                                                                                <button className="added-to-wishlist">
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.handleRemoveFromWishlist(
                                                                                                recommendedItem.id
                                                                                            )
                                                                                        }
                                                                                        className="fa-solid fa-heart"
                                                                                    ></i>
                                                                                </button>
                                                                            )}
                                                                            {!recommendedItem.addedToWishlist && (
                                                                                <button className="removed-from-wishlist">
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.handleAddToWishlist(
                                                                                                recommendedItem.id
                                                                                            )
                                                                                        }
                                                                                        className="fa-regular fa-heart"
                                                                                    ></i>
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <ul className="item-data">
                                                                    <li className="item-name">
                                                                        <p>
                                                                            {
                                                                                recommendedItem.item_name
                                                                            }
                                                                        </p>
                                                                    </li>

                                                                    <li className="price">
                                                                        {recommendedItem.item_price ==
                                                                            -1 && (
                                                                            <div className="price-text">
                                                                                <div className="discounted-price">
                                                                                    S${" "}
                                                                                    {recommendedItem.item_discounted_price.toFixed(
                                                                                        2
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {recommendedItem.item_price !=
                                                                            -1 && (
                                                                            <div className="price-text">
                                                                                <div className="default-price">
                                                                                    S${" "}
                                                                                    {recommendedItem.item_price.toFixed(
                                                                                        2
                                                                                    )}
                                                                                </div>
                                                                                <div className="discounted-price">
                                                                                    S${" "}
                                                                                    {recommendedItem.item_discounted_price.toFixed(
                                                                                        2
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                    <li className="deliveryfee">
                                                                        <i class="fa-solid fa-truck"></i>{" "}
                                                                        {recommendedItem.deliveryFee ==
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
                                                                        {recommendedItem.deliveryFee !=
                                                                            0.0 && (
                                                                            <div className="deliveryfee-text">
                                                                                S$
                                                                                {
                                                                                    "    "
                                                                                }
                                                                                {recommendedItem.deliveryFee.toFixed(
                                                                                    2
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                    <li className="rating">
                                                                        <div className="rating-prop">
                                                                            <i className="fa-solid fa-star"></i>
                                                                            <div className="rating-text">
                                                                                {recommendedItem.rating.toFixed(
                                                                                    2
                                                                                )}{" "}
                                                                                (
                                                                                {
                                                                                    recommendedItem.numOfRating
                                                                                }{" "}
                                                                                reviews)
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li className="item-url">
                                                                        <button className="btn btn-positive visit-link-button">
                                                                            <a
                                                                                href={
                                                                                    recommendedItem.item_url
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    Buy
                                                                                </p>
                                                                            </a>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {!hasRecommend && retrievedSearch && (
                                            <div>
                                                <p>
                                                    <i>
                                                        Your recommendation will
                                                        show up once you
                                                        searched at least 10
                                                        times.
                                                    </i>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {retrievedSearch && (
                                    <div className="item-view__page-nav">
                                        <div className="item-view__page-nav__content">
                                            {currentPageNum > 1 && (
                                                <a
                                                    className="item-view__page-nav__content__previous"
                                                    onClick={this.previousPage}
                                                >
                                                    <i class="fa-solid fa-chevron-left"></i>
                                                    <p>Previous</p>
                                                </a>
                                            )}

                                            {[
                                                ...new Set(
                                                    items.map(
                                                        (item) => item.page
                                                    )
                                                ),
                                            ]
                                                .sort(function (a, b) {
                                                    return a - b;
                                                })
                                                .map((pg) => (
                                                    <div>
                                                        {currentPageNum ==
                                                            pg && (
                                                            <a className="item-view__page-nav__content__number--active">
                                                                <p>{pg}</p>
                                                            </a>
                                                        )}
                                                        {currentPageNum !=
                                                            pg && (
                                                            <a
                                                                className="item-view__page-nav__content__number"
                                                                onClick={() =>
                                                                    this.setCurrentPage(
                                                                        pg
                                                                    )
                                                                }
                                                            >
                                                                <p>{pg}</p>
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}

                                            {currentPageNum <
                                                Math.max(
                                                    ...new Set(
                                                        items.map(
                                                            (item) => item.page
                                                        )
                                                    )
                                                ) && (
                                                <a
                                                    className="item-view__page-nav__content__next"
                                                    onClick={this.nextPage}
                                                >
                                                    <p>Next</p>
                                                    <i class="fa-solid fa-chevron-right"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
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
