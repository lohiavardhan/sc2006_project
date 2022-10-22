import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../../static/css/Home.css";
import "../../static/css/Wishlist.css";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    let { username } = this.props.params;
    this.state = {
      prop_username: username,
      username: username,
      wishlist: [
        {
          id: "",
          added_at: "",
          session_key: "",
          item: {
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
        },
      ],
      error_message: "NULL",
      redirect: false,
      isAuth: true,
    };

    this.fetchWishListData = this.fetchWishListData.bind(this);
    this.handleRemoveFromWishlist = this.handleRemoveFromWishlist.bind(this);
  }

  fetchWishListData() {
    fetch("/api/v1/accounts/wishlist?username=" + this.state.prop_username)
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
            username: this.state.prop_username,
            wishlist: json.payload,
          });
        }
      });
  }

  componentDidMount() {
    this.fetchWishListData();
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
          this.fetchWishListData();
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
          <div className="wishlist-page">
            <div className="wishlist-view">
              <h1 className="title wishlist-title">{username}'s Wishlist </h1>

              {error_message == "NULL" && (
                <div className="all-items">
                  {wishlist.map((item) => (
                    <div className="item-container">
                      <div className="item-props" key={item.id}>
                        <div className="item-picture">
                          <img
                            className="item-picture__image"
                            src={item.item.image_url}
                          ></img>
                          <div className="item-picture__brand-logo">
                            {item.item.platform == "Shopee" && (
                              <div className="item-picture__brand-logo__circle">
                                <img
                                  width="45px"
                                  height="45px"
                                  src="https://img.icons8.com/color/344/shopee.png"
                                ></img>
                              </div>
                            )}
                            {item.item.platform == "Amazon" && (
                              <div className="item-picture__brand-logo__circle">
                                <img
                                  width="45px"
                                  height="45px"
                                  src="https://img.icons8.com/color/344/amazon.png"
                                ></img>
                              </div>
                            )}
                            {item.item.platform == "Lazada" && (
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
                              {item.item.addedToWishlist && (
                                <button className="added-to-wishlist">
                                  <i
                                    onClick={() =>
                                      this.handleRemoveFromWishlist(
                                        item.item.id
                                      )
                                    }
                                    className="fa-solid fa-heart"
                                  ></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <ul className="item-data">
                          <li className="item-name">
                            <p>{item.item.item_name}</p>
                          </li>

                          <li className="price">
                            {item.item.item_price == -1 && (
                              <div className="price-text">
                                <div className="discounted-price">
                                  S$ {item.item.item_discounted_price}
                                </div>
                              </div>
                            )}
                            {item.item.item_price != -1 && (
                              <div className="price-text">
                                <div className="default-price">
                                  S$ {item.item.item_price}
                                </div>
                                <div className="discounted-price">
                                  S$ {item.item.item_discounted_price}
                                </div>
                              </div>
                            )}
                          </li>
                          <li className="deliveryfee">
                            <i class="fa-solid fa-truck"></i>{" "}
                            {item.item.deliveryFee == 0.0 && (
                              <div className="deliveryfee-text">
                                Free
                                <p>(Subject to platform T&C)</p>
                              </div>
                            )}
                            {item.item.deliveryFee != 0.0 && (
                              <div className="deliveryfee-text">
                                S$
                                {"    "}
                                {item.item.deliveryFee}
                              </div>
                            )}
                          </li>
                          <li className="rating">
                            <div className="rating-prop">
                              <i className="fa-solid fa-star"></i>
                              <div className="rating-text">
                                {item.item.rating} ({item.item.numOfRating}{" "}
                                reviews)
                              </div>
                            </div>
                          </li>
                          <li className="item-url">
                            <button className="btn btn-positive visit-link-button">
                              <a href={item.item.item_url}>
                                <p>Buy</p>
                              </a>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {error_message != "NULL" && (
                <div className="wishlist-error">
                  <p>{error_message}</p>
                  <img
                    alt="No items icon"
                    src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/000000/external-no-customer-feedback-flaticons-lineal-color-flat-icons.png"
                  />
                </div>
              )}
            </div>
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
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default withParams(Wishlist);
