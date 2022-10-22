import React, { Component } from "react";
import LoggedOutNavbar from "./LoggedOutNavbar";
import TypedReact from "./TypedReact";
import "../../static/css/Landing.css";

export default class Landing extends Component {
  render() {
    return (
      <>
        <LoggedOutNavbar />

        <div className="hero-wrap">
          <div class="area">
            <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="dummy-wrap">
            <div className="hero-container">
              <h1 className="hero-heading-top">Want to</h1>
              <h1>
                <TypedReact
                  strings={["shop?^250", "compare?^250", "save?^250"]}
                />
              </h1>

              <p>
                Search once, and get results for all our supported platforms. It
                is that &nbsp;
                <b>
                  <span className="highlight">simple</span>
                </b>
                .
              </p>
              <div className="hero-buttons">
                <a className="hero-button-get-started" href="/signup">
                  Get Started Now
                </a>
                <a className="hero-button-learn-more" href="/about">
                  Learn More
                </a>
              </div>

              <div className="supported-platform">
                <h4>Supported platforms</h4>
                <ul>
                  <li>
                    <a title="Amazon.sg" href="https://amazon.sg">
                      <img
                        width="45px"
                        height="45px"
                        className="amazon"
                        src="https://img.icons8.com/color/344/amazon.png"
                      />
                    </a>
                  </li>
                  <li>
                    <a title="Shopee.sg" href="https://shopee.sg">
                      <img
                        width="45px"
                        height="45px"
                        className="shopee"
                        src="https://img.icons8.com/color/344/shopee.png"
                      />
                    </a>
                  </li>
                  <li>
                    <a title="Lazada.sg" href="https://lazada.sg">
                      <img
                        width="45px"
                        height="45px"
                        className="lazada"
                        src="https://img.icons8.com/plasticine/344/lazada.png"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
