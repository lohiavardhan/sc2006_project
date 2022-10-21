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
    this.handleReset = this.handleReset.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
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
        if (json.error == "status_OK") {
          this.setState({
            items: json.result,
            retrievedSearch: true,
            searchedItem: keyword,
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
      document.querySelector('input[name="platform"]:checked').checked = false;
    } catch {}
    try {
      document.querySelector('input[name="rating"]:checked').checked = false;
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
                        Shopee
                      </div>
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
                      <div>
                        <input
                          type="radio"
                          name="rating"
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

                  <button className="submit-filter">Filter</button>
                  <button className="reset-filter" onClick={this.handleReset}>
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
                    <p>Use the search bar above to search for any item</p>
                    <img src="https://img.icons8.com/plasticine/100/000000/search-more.png" />
                  </div>
                )}

                {!retrievedSearch && error_message != "" && (
                  <div className="placeholder-during-nosearch">
                    <h1 className="search__heading"> {error_message}</h1>
                    <p>
                      Sorry, we cannot find any results for your search item
                    </p>
                    <img
                      alt="No results icon"
                      src="https://img.icons8.com/stickers/100/000000/nothing-found.png"
                    />
                  </div>
                )}
                {retrievedSearch && (
                  <div className="search__items-found">
                    <h2 className="search__heading">{searchedItem}</h2>
                    <p>{items.length + " items found"}</p>
                  </div>
                )}
                {retrievedSearch && (
                  <div className="all-items">
                    {items.map(
                      (item) =>
                        currentPageNum == item.page && (
                          <div className="item-container">
                            <div className="item-props" key={item.id}>
                              <div className="item-picture">
                                <img
                                  className="item-picture__image"
                                  src={item.image_url}
                                ></img>
                                <div className="item-picture__brand-logo">
                                  {item.platform == "Shopee" && (
                                    <div className="item-picture__brand-logo__circle">
                                      <img
                                        width="45px"
                                        height="45px"
                                        src="https://img.icons8.com/color/344/shopee.png"
                                      ></img>
                                    </div>
                                  )}
                                  {item.platform == "Amazon" && (
                                    <div className="item-picture__brand-logo__circle">
                                      <img
                                        width="45px"
                                        height="45px"
                                        src="https://img.icons8.com/color/344/amazon.png"
                                      ></img>
                                    </div>
                                  )}
                                  {item.platform == "Lazada" && (
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
                                        <i class="fa-solid fa-heart"></i>
                                      </button>
                                    )}
                                    {!item.addedToWishlist && (
                                      <button className="removed-from-wishlist">
                                        <i class="fa-regular fa-heart"></i>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <ul className="item-data">
                                <li className="item-name">
                                  <p>{item.item_name}</p>
                                </li>

                                <li className="price">
                                  {item.item_price == -1 && (
                                    <div className="price-text">
                                      <div className="discounted-price">
                                        S${" "}
                                        {item.item_discounted_price.toFixed(2)}
                                      </div>
                                    </div>
                                  )}
                                  {item.item_price != -1 && (
                                    <div className="price-text">
                                      <div className="default-price">
                                        S$ {item.item_price.toFixed(2)}
                                      </div>
                                      <div className="discounted-price">
                                        S${" "}
                                        {item.item_discounted_price.toFixed(2)}
                                      </div>
                                    </div>
                                  )}
                                </li>
                                <li className="deliveryfee">
                                  <i class="fa-solid fa-truck"></i>{" "}
                                  {item.deliveryFee == 0.0 && (
                                    <div className="deliveryfee-text">
                                      Free
                                      <p>(Subject to platform T&C)</p>
                                    </div>
                                  )}
                                  {item.deliveryFee != 0.0 && (
                                    <div className="deliveryfee-text">
                                      S$
                                      {"    "}
                                      {item.deliveryFee.toFixed(2)}
                                    </div>
                                  )}
                                </li>
                                <li className="rating">
                                  <div className="rating-prop">
                                    <i className="fa-solid fa-star"></i>
                                    <div className="rating-text">
                                      {item.rating.toFixed(2)} (
                                      {item.numOfRating} reviews)
                                    </div>
                                  </div>
                                </li>
                                <li className="item-url">
                                  <button className="btn btn-positive visit-link-button">
                                    <a href={item.item_url}>
                                      <p>Buy</p>
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

                {hasRecommend ||
                  (retrievedSearch && (
                    <div className="recommended-item-section">
                      <hr className="line search__line" />
                      <h2 className="search__heading">You may also like:</h2>

                      {hasRecommend && (
                        <div className="all-items">
                          {recommendedItems.map((item) => (
                            <div key={item.id}>
                              <div className="item-container">
                                <div className="item-props" key={item.id}>
                                  <div className="item-picture">
                                    <img
                                      className="item-picture__image"
                                      src={item.image_url}
                                    ></img>
                                    <div className="item-picture__brand-logo">
                                      {item.platform == "Shopee" && (
                                        <div className="item-picture__brand-logo__circle">
                                          <img
                                            width="45px"
                                            height="45px"
                                            src="https://img.icons8.com/color/344/shopee.png"
                                          ></img>
                                        </div>
                                      )}
                                      {item.platform == "Amazon" && (
                                        <div className="item-picture__brand-logo__circle">
                                          <img
                                            width="45px"
                                            height="45px"
                                            src="https://img.icons8.com/color/344/amazon.png"
                                          ></img>
                                        </div>
                                      )}
                                      {item.platform == "Lazada" && (
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
                                            <i class="fa-solid fa-heart"></i>
                                          </button>
                                        )}
                                        {!item.addedToWishlist && (
                                          <button className="removed-from-wishlist">
                                            <i class="fa-regular fa-heart"></i>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <ul className="item-data">
                                    <li className="item-name">
                                      <p>{item.item_name}</p>
                                    </li>

                                    <li className="price">
                                      {item.item_price == -1 && (
                                        <div className="price-text">
                                          <div className="discounted-price">
                                            S${" "}
                                            {item.item_discounted_price.toFixed(
                                              2
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      {item.item_price != -1 && (
                                        <div className="price-text">
                                          <div className="default-price">
                                            S$ {item.item_price.toFixed(2)}
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
                                      {item.deliveryFee == 0.0 && (
                                        <div className="deliveryfee-text">
                                          Free
                                          <p>(Subject to platform T&C)</p>
                                        </div>
                                      )}
                                      {item.deliveryFee != 0.0 && (
                                        <div className="deliveryfee-text">
                                          S$
                                          {"    "}
                                          {item.deliveryFee.toFixed(2)}
                                        </div>
                                      )}
                                    </li>
                                    <li className="rating">
                                      <div className="rating-prop">
                                        <i className="fa-solid fa-star"></i>
                                        <div className="rating-text">
                                          {item.rating.toFixed(2)} (
                                          {item.numOfRating} reviews)
                                        </div>
                                      </div>
                                    </li>
                                    <li className="item-url">
                                      <button className="btn btn-positive visit-link-button">
                                        <a href={item.item_url}>
                                          <p>Buy</p>
                                        </a>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {!hasRecommend && retrievedSearch && (
                        <div>
                          <p>
                            <i>
                              Your recommendation will show up once you searched
                              at least 10 times.
                            </i>
                          </p>
                        </div>
                      )}
                      {/* {!hasRecommend && !retrievedSearch && (
                    <div>Happy hunting!</div>
                  )} */}
                    </div>
                  ))}

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

                      {[...new Set(items.map((item) => item.page))]
                        .sort(function (a, b) {
                          return a - b;
                        })
                        .map((pg) => (
                          <div>
                            {currentPageNum == pg && (
                              <a className="item-view__page-nav__content__number--active">
                                <p>{pg}</p>
                              </a>
                            )}
                            {currentPageNum != pg && (
                              <a
                                className="item-view__page-nav__content__number"
                                onClick={() => this.setCurrentPage(pg)}
                              >
                                <p>{pg}</p>
                              </a>
                            )}
                          </div>
                        ))}

                      {currentPageNum <
                        Math.max(
                          ...new Set(items.map((item) => item.page))
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
