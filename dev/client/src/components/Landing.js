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
                    <div className="hero-container">
                        <h1>Want to</h1>
                        <h1>
                            <TypedReact
                                strings={[
                                    "shop?^250",
                                    "compare?^250",
                                    "save?^250",
                                ]}
                            />
                        </h1>
                        <p>
                            It is no longer a myth. We at FindR will transform
                            your online shopping experience.
                        </p>
                        <div className="hero-buttons">
                            <a
                                className="hero-button-get-started"
                                href="/signup"
                            >
                                Get Started Now
                            </a>
                            <a className="hero-button-learn-more" href="/about">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
