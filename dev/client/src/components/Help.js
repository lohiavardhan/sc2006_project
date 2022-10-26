import React, { Component } from "react";
import "../../static/css/Help.css";
import Navbar from "./Navbar";

export default class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(section) {
    this.setState({ section: section });
    document.getElementById(`${section}`).style.display = "flex";

    if (section != "getting-started") {
      document.getElementById(`getting-started`).style.display = "none";
    }
    if (section != "terms-of-services") {
      document.getElementById(`terms-of-services`).style.display = "none";
    }
    if (section != "features") {
      document.getElementById(`features`).style.display = "none";
    }
    if (section != "accounts") {
      document.getElementById(`accounts`).style.display = "none";
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="faq-banner">
          <div className="title-card-section">
            <h1 className="title faq-banner-title">FindR FAQ</h1>
            <p>New to FindR? </p>
            <p>Have unanswered questions?</p>
            <p>We got you covered in this FAQ page.</p>
          </div>
          <img
            className="faq-banner-image"
            src="https://i.postimg.cc/hGwbGfhm/People-Talking-Illustration.jpg"
            alt="People-Talking"
          />
        </div>

        <div className="faq-content">
          <div className="nav-list">
            <button
              onClick={() => this.handleClick("getting-started")}
              className="nav-list-button"
            >
              <li>Getting started with FindR</li>
            </button>
            <button
              onClick={() => this.handleClick("features")}
              className="nav-list-button"
            >
              <li>FindR features</li>
            </button>
            <button
              onClick={() => this.handleClick("terms-of-services")}
              className="nav-list-button"
            >
              <li>Terms of services</li>
            </button>
            <button
              onClick={() => this.handleClick("accounts")}
              className="nav-list-button"
            >
              <li>Accounts</li>
            </button>
          </div>

          <div className="faq-info">
            <div
              style={{
                display: "flex",
              }}
              id="getting-started"
              className="info"
            >
              <h className="title">Getting started with FindR</h>
              <div className="info-cards">
                <div className="info-card">
                  <h1>What is FindR?</h1>
                  <p>
                    FindR is an online cross-platform price comparison app that
                    aims to transforms your e-shopping experience.{" "}
                  </p>

                  <p>
                    With FindR, we streamlined the process of cross comparison,
                    allowing customers to easily search, compare and purchase
                    listings for an item sold in multiple platforms.{" "}
                  </p>
                </div>
                <div className="info-card">
                  <h1>What e-commerce platform does FindR support?</h1>
                  <p>
                    FindR supports Amazon.sg, Lazada.sg and Shopee.sg at the
                    moment.{" "}
                  </p>
                  <p>
                    The development team aims to include more e-commerce
                    platforms in the future to provide our users the best
                    possible deals.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "none",
              }}
              id="features"
              className="info"
            >
              <h className="title">FindR features</h>
              <div className="info-cards">
                <div className="info-card">
                  <h1>What are the features available?</h1>
                  <p>
                    User can obtain item listings from our supported e-commerce
                    platforms with <b>just one keyword search</b>. User can even
                    have their own customized wishlist!
                  </p>

                  <p>&nbsp;</p>

                  <p>
                    <i>FindR is much more than just a search tool.</i>
                  </p>

                  <p>&nbsp;</p>

                  <p>
                    User can expand their social network through our app. User
                    can <b>add friends</b> and{" "}
                    <b>view their friends' wishlists</b>.
                  </p>

                  <p>
                    Our system will automatically send out a notification to
                    users when their friends' birthday is in 7 days. What is
                    left to worry about birthday gifts when you can view what
                    your friend truly desires!
                  </p>
                </div>
                <div className="info-card">
                  <h1>Is FindR truly free?</h1>
                  <p>
                    Yes! FindR is built with open-source libraries. Hence, it
                    will always be free!
                  </p>
                  <p>
                    For more information regarding the terms of services and
                    license agreement, please visit{" "}
                    <button
                      style={{
                        color: "#42a598",
                        fontWeight: "normal",
                      }}
                    >
                      Terms of services
                    </button>{" "}
                    section.
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "none",
              }}
              id="terms-of-services"
              className="info"
            >
              <h className="title">Terms of services</h>
              <div className="info-cards">
                <div className="info-card">
                  <h1>What is the FindR Project licensed under?</h1>
                  <p>
                    FindR Project is licensed under the BSD 3-Clause License.
                  </p>
                  <p>
                    More information regarding the license agreement can be
                    found below:
                  </p>
                  <p>&nbsp;</p>
                  <i>
                    <p>BSD 3-Clause License </p>
                    <p>Copyright (c) 2022, Neo-Zenith</p>
                    <p>All rights reserved. </p>
                    <p>
                      Redistribution and use in source and binary forms, with or
                      without modification, are permitted provided that the
                      following conditions are met:
                    </p>
                    <p>
                      1. Redistributions of source code must retain the above
                      copyright notice, this list of conditions and the
                      following disclaimer.{" "}
                    </p>{" "}
                    <p>
                      2. Redistributions in binary form must reproduce the above
                      copyright notice, this list of conditions and the
                      following disclaimer in the documentation and/or other
                      materials provided with the distribution.{" "}
                    </p>
                    <p>
                      3. Neither the name of the copyright holder nor the names
                      of its contributors may be used to endorse or promote
                      products derived from this software without specific prior
                      written permission.{" "}
                    </p>
                    <p>
                      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
                      CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
                      WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
                      WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
                      PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
                      HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
                      INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
                      (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
                      GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
                      BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
                      LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
                      (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
                      OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
                      POSSIBILITY OF SUCH DAMAGE.
                    </p>
                  </i>
                </div>
                <div className="info-card">
                  <h1>What are the terms of services for using FindR?</h1>
                  <p>
                    When you sign up for an account for the FindR web
                    application, you agree and consent to the following:
                  </p>
                  <p>
                    1. The FindR web application shall store a user's personal
                    infromation upon receiving update by the user. The personal
                    information shall only be used solely for the
                    functionalities within this application, which includes but
                    not limited to displaying actual name and sending birthday
                    notifications to other users.
                  </p>
                  <p>
                    2. FindR shall not be held accountable for any financial
                    losses from user purchases. The data provided by FindR is
                    only for user's reference. Users shall exercise their rights
                    to enquire further with the sellers prior to any purchase
                    decisions. FindR shall not be held liable for any refunds.
                  </p>
                  <p>
                    3. All pricing policy shall follow each platform's own
                    policy standards. FindR shall not be held accountable for
                    any misinterpretation of information, such as delivery fee,
                    discounts, etc., which are obtained from the supported
                    platforms. Users are strongly advised to contact the
                    respective platforms for such matters.
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "none",
              }}
              id="accounts"
              className="info"
            >
              <h className="title">FindR Accounts</h>
              <div className="info-cards">
                <div className="info-card">
                  <h1>How do I edit my account details?</h1>
                  <p>
                    1. Click on the{" "}
                    <i
                      style={{
                        color: "rgb(66,165, 152)",
                      }}
                      className="fa-regular fa-user"
                    ></i>{" "}
                    icon in the navbar.
                  </p>
                  <p>
                    2. Click on <i>Edit Profile</i>
                  </p>
                  <p>
                    3. Enter your updated details and click <i>Update</i>.
                  </p>
                </div>
                <div className="info-card">
                  <h1>How do I view my wishlist items?</h1>
                  <p>
                    1. Click on the{" "}
                    <i
                      style={{
                        color: "rgb(66,165, 152)",
                      }}
                      className="fa-regular fa-heart"
                    ></i>{" "}
                    icon in the navbar.
                  </p>
                  <p>2. You will be redirected to your wishlist.</p>
                </div>
              </div>
              <div className="info-cards">
                <div className="info-card">
                  <h1>How do I view my friend list?</h1>
                  <p>
                    1. Click on the{" "}
                    <i
                      style={{
                        color: "rgb(66,165, 152)",
                      }}
                      className="fa-regular fa-user"
                    ></i>{" "}
                    icon in the navbar.
                  </p>
                  <p>
                    2. Click on <i>View Friends</i>
                  </p>
                  <p>3. You will be redirected to your friend list..</p>
                </div>
                <div className="info-card">
                  <h1>How do I view my pending friend requests?</h1>
                  <p>
                    1. Click on the{" "}
                    <i
                      style={{
                        color: "rgb(66,165, 152)",
                      }}
                      className="fa-regular fa-heart"
                    ></i>{" "}
                    icon in the navbar.
                  </p>
                  <p>
                    2. Click on <i>Add Friends</i>
                  </p>
                  <p>
                    3. You will be able to see all the pending incoming and
                    outgoing friend requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
