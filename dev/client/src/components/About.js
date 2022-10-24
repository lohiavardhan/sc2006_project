import React, { Component } from "react";
import "../../static/css/Help.css";
import LoggedOutNavbar from "./LoggedOutNavbar";


export default class About extends Component {

    render(){
        return(
            <>
                <LoggedOutNavbar/>
                <h1 className = "title" >About FindR</h1>
                <details>
                    <summary style = {{width: "33rem"}}>What does FindR do?</summary>
                        <ol>
                            <span>
                                <li className = "span">Search e-commerce platforms for your item</li>
                                <li className = "span">Compute a side-by-side comparison for the best deals</li>
                                <li className = "span">Recommends you items based on your history</li>
                            </span>
                        </ol>
                </details>
                <div>
                    <details>
                        <summary>Why use FindR? </summary>
                            <ol>
                                <span>
                                    <li className = "span">Fast and Simple</li>
                                    <li className = "span">Friendly interface</li>
                                    <li className = "span">Always give the best deals</li>
                                </span>
                            </ol>
                    </details>
                </div>
                <div>
                    <details>
                        <summary>How to search?  </summary>
                            <ol>
                                <span>
                                    <li className = "span">Login / Signup</li>
                                    <li className = "span">Click on home logo</li>
                                    <li className = "span">Input into the search bar</li>
                                    <li className = "span">Click search </li>
                                </span>
                            </ol>
                    </details>
                </div>
                <br/>
                <p><h3 className = "subtitle">Common Questions </h3></p>
                <div>
                    <details>
                        <summary style = {{width: "33rem"}}>Will I find my item? </summary>
                            <ol>
                                <span>
                                    <li className = "span">If it is available, it will be displayed</li>
                                    <li className = "span">Item support from 5 popular e-commerce platforms</li>
                                </span >
                            </ol>
                    </details>
                </div>


            </>
        )
        
        
    }
}